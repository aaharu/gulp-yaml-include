/*!
 * @license gulp-yaml-include (c) 2015 aaharu
 * Copyrights licensed under the 2-clause BSD License. See the accompanying LICENSE file for terms.
 *
 * Includes:
 * - through2
 *   Copyright (c) 2016 Rod Vagg (the "Original Author") and additional contributors
 * - js-yaml
 *   Copyright (C) 2011-2015 by Vitaly Puzrin
 * - yaml-include
 *   Copyright (c) 2015, Clay Loveless
 */

"use strict";

var through = require("through2"),
    yaml = require("js-yaml"),
    yamlinc = require("yaml-include"),
    es = require("event-stream"),
    PassThrough = require("stream").PassThrough;

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        yamlinc.setBaseFile(file.path);
        if (file.isBuffer()) {
            var yml = yaml.load(file.contents.toString(enc), {
                schema: yamlinc.YAML_INCLUDE_SCHEMA,
                filename: file.path
            });
            file.contents = Buffer.from(yaml.dump(yml), enc);
            cb(null, file);
        } else if (file.isStream()) {
            file.contents.setEncoding(enc);
            file.contents.pipe(es.wait(function(err, data) {
                var ymlobj = yaml.load(data.toString(), {
                    schema: yamlinc.YAML_INCLUDE_SCHEMA,
                    filename: file.path
                });
                var stream = new PassThrough();
                stream.write(yaml.dump(ymlobj));
                stream.end();
                file.contents = file.contents.pipe(stream);
                cb(null, file);
            }));
        } else {
            cb(null, file);
        }
    });
};
