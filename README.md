# gulp-bos

A gulp plugin to upload file to Baidu BCE BOS (http://bce.baidu.com/product/bos.html).

## Usage

```js
bos = require('gulp-bos');

gulp.task('bos', function () {
    return gulp.src('dist/**/*.{js,css}')
        .pipe(bos({
            credentials: {
                ak: 'put your access key',
                sk: 'put your secrect key'
            },
            endpoint: 'http://gz.bcebos.com',  // Or http://bj.bcebos.com
            bucket: 'bucket-name',
            prefix: 'assets'  // Default is ''. You can add prefix before the basename
        }));
});
```
