const Path = require('./gulp/path');
const rollupBundle = require('./gulp/rollup-bundle');
const gulp = require('gulp');
const bundleUglify = require('./gulp/gulp-uglify');

gulp.task('build-lib', () => {
    return rollupBundle('./src/index.js', 'model-persistence.js', 'modelPersist', {
        externalHelpers: false,
        exclude: ['node_modules/**'],
    }, {
        objectmodel: 'Model',
        axios: 'axios'
    });
});

gulp.task('dist-lib', ['build-lib'], () => {
    return bundleUglify(Path.bundle('/model-persistence.js'), Path.bundle());
});


gulp.task('dist', ['dist-lib']);

// Watchers

gulp.task('watch:lib', () => {
    return gulp.watch('./src/**/*.js', ['dist-lib']);
});

gulp.task('watch', ['watch:lib']);
