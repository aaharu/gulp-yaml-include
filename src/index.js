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
