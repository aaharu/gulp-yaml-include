# gulp-yaml-include

A gulp plugin for [yaml-include](https://github.com/claylo/yaml-include).  

[![npm version](https://img.shields.io/npm/v/gulp-yaml-include.svg)](https://www.npmjs.com/package/gulp-yaml-include)
[![Build Status](https://img.shields.io/travis/aaharu/gulp-yaml-include.svg)](https://travis-ci.org/aaharu/gulp-yaml-include) [![Coverage Status](https://img.shields.io/coveralls/aaharu/gulp-yaml-include.svg)](https://coveralls.io/github/aaharu/gulp-yaml-include?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/aaharu/gulp-yaml-include/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/aaharu/gulp-yaml-include/?branch=master) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faaharu%2Fgulp-yaml-include.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faaharu%2Fgulp-yaml-include?ref=badge_shield)

## Usage

```text
current/
├── gulpfile.js
├── dist/
└── src/
    ├── base.yaml
    └── parts/
        └── sub.yaml
```

`gulpfile.js`

```js
var gulp = require("gulp"),
    yamlinc = require("gulp-yaml-include");

gulp.task("sample", function () {
    return gulp.src("./src/*.yaml")
        .pipe(yamlinc())
        .pipe(gulp.dest("./dist/"));
});
```

`src/base.yaml`

```yaml
version: 1
sub: !!inc/file parts/sub.yaml
```

`src/parts/sub.yaml`

```yaml
hoge: fuga
```

results:

`dist/base.yaml`

```yaml
version: 1
sub:
  hoge: fuga
```

## LICENSE

BSD-2-Clause

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faaharu%2Fgulp-yaml-include.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faaharu%2Fgulp-yaml-include?ref=badge_large)
