"use strict";

var path = require("path"),
    fs = require("fs"),
    assert = require("assert"),
    es = require("event-stream"),
    gutil = require("gulp-util"),
    PassThrough = require("stream").PassThrough,
    index = require("../src/index");

describe("gulp-yaml-include", function () {
    it("should work in buffer mode", function (done) {
        var stream = index();
        var testFile = new gutil.File({
                base: __dirname,
                cwd: __dirname,
                path: path.join(__dirname, 'test.yaml'),
                contents: fs.readFileSync(path.join(__dirname, "test.yaml"))
            });

        stream.on("data", function () {
            assert.equal("paths:\n  a: b\n", testFile.contents.toString());
        });

        stream.on("end", function () {
            done();
        });

        stream.write(testFile);
        stream.end();
    });

    it("should work in stream mode", function (done) {
        var stream = index();
        var testStream = new PassThrough();
        var testFile = new gutil.File({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, 'test.yaml'),
            contents: testStream
        });
        testStream.write(fs.readFileSync(path.join(__dirname, "test.yaml")));
        testStream.write(Buffer.from("\n"));
        testStream.write(Buffer.from("c: 1"));
        testStream.end();

        stream.on("data", function (newFile) {
            newFile.pipe(es.wait(function(err, data) {
                assert.equal("paths:\n  a: b\nc: 1\n", data.toString());
            }));
        });

        stream.on("end", function () {
            done();
        });

        stream.write(testFile);
        stream.end();
    });

    it("should let null files pass through", function (done) {
        var stream = index(),
            n = 0;
        stream.pipe(es.through(function (file) {
            assert.equal(file.path, "null.yaml");
            assert.equal(file.contents,  null);
            n++;
        }, function () {
            assert.equal(n, 1);
            done();
        }));
        stream.write(new gutil.File({
            path: "null.yaml",
            contents: null
         }));
        stream.end();
    });

    it("should work subdir inc", function (done) {
        var stream = index();
        var testFile = new gutil.File({
                base: __dirname,
                cwd: __dirname,
                path: path.join(__dirname, 'base.yaml'),
                contents: fs.readFileSync(path.join(__dirname, "base.yaml"))
            });

        stream.on("data", function () {
            assert.equal("version: 1\nsub:\n  hoge: fuga\n", testFile.contents.toString());
        });

        stream.on("end", function () {
            done();
        });

        stream.write(testFile);
        stream.end();
    });
});
