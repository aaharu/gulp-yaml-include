"use strict";

var through = require("through2"),
    yaml = require("js-yaml"),
    yamlinc = require("yaml-include"),
    PassThrough = require("stream").PassThrough;

module.exports = function () {

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            var yml = yaml.load(file.contents.toString(enc), {
                schema: yamlinc.YAML_INCLUDE_SCHEMA,
                filename: file.path
            });
            file.contents = new Buffer(yaml.dump(yml), enc);
        }
        if (file.isStream()) {
            file.contents.setEncoding(enc);
            var ymlobj = yaml.load(file.contents.read(), {
                schema: yamlinc.YAML_INCLUDE_SCHEMA,
                filename: file.path
            });
            var stream = new PassThrough();
            stream.write(yaml.dump(ymlobj));
            file.contents = file.contents.pipe(stream);
        }

        return cb(null, file);
    });

};
