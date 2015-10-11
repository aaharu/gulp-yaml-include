# gulp-yaml-include

A gulp plugin for js-yaml and [yaml-include](https://github.com/claylo/yaml-include).

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
