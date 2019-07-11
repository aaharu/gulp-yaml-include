"use strict";

var path = require("path"),
    fs = require("fs"),
    assert = require("assert"),
    es = require("event-stream"),
    Vinyl = require("vinyl"),
    index = require("../src/index");

describe("gulp-yaml-include", function () {
    it("should work in buffer mode", function (done) {
        var myStream = index();
        var testFile = new Vinyl({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, 'test.yaml'),
            contents: fs.readFileSync(path.join(__dirname, "test.yaml"))
        });

        myStream.on("data", function (file) {
            assert.ok(file.isBuffer());
            assert.equal(testFile.contents.toString(), "paths:\n  a: b\n");
        });

        myStream.on("end", function () {
            done();
        });

        myStream.write(testFile);
        myStream.end();
    });

    it("should work in stream mode", function (done) {
        var myStream = index();
        var testFile = new Vinyl({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, 'test.yaml'),
            contents: fs.createReadStream(path.join(__dirname, 'test.yaml'))
        });

        myStream.on("data", function (newFile) {
            assert.ok(newFile.isStream());
            newFile.contents.pipe(es.wait(function(err, data) {
                assert.equal(data.toString(), "paths:\n  a: b\n");
            }));
        });

        myStream.on("end", function () {
            done();
        });

        myStream.write(testFile);
        myStream.end();
    });

    it("should let null files pass through", function (done) {
        var myStream = index(),
            n = 0;
        myStream.pipe(es.through(function (file) {
            assert.equal(file.path, "null.yaml");
            assert.equal(file.contents,  null);
            n++;
        }, function () {
            assert.equal(1, n);
            done();
        }));
        myStream.write(new Vinyl({
            path: "null.yaml",
            contents: null
         }));
         myStream.end();
    });

    it("should work subdir inc", function (done) {
        var myStream = index();
        var testFile = new Vinyl({
            base: __dirname,
            cwd: __dirname,
            path: path.join(__dirname, 'base.yaml'),
            contents: fs.readFileSync(path.join(__dirname, "base.yaml"))
        });

        myStream.on("data", function () {
            assert.equal(testFile.contents.toString(), "version: 1\nsub:\n  hoge: fuga\n");
        });

        myStream.on("end", function () {
            done();
        });

        myStream.write(testFile);
        myStream.end();
    });
});
