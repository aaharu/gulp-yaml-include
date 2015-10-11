# gulp-yaml-include

A gulp plugin for js-yaml and [yaml-include](https://github.com/claylo/yaml-include).  

[![npm version](https://img.shields.io/npm/v/gulp-yaml-include.svg)](https://www.npmjs.com/package/gulp-yaml-include)
[![Build Status](https://img.shields.io/travis/aaharu/gulp-yaml-include.svg)](https://travis-ci.org/aaharu/gulp-yaml-include) [![Coverage Status](https://img.shields.io/coveralls/aaharu/gulp-yaml-include.svg)](https://coveralls.io/github/aaharu/gulp-yaml-include?branch=master) [![Dependency Status](https://img.shields.io/gemnasium/aaharu/gulp-yaml-include.svg)](https://gemnasium.com/aaharu/gulp-yaml-include)  

## Usage

```js
var gulp = require("gulp"),
    yamlinc = require("gulp-yaml-include");

gulp.task("sample", function () {
    return gulp.src("./src/*.yaml")
        .pipe(yamlinc())
        .pipe(gulp.dest("./dist/"));
});
```

## LICENSE

BSD-2-Clause
