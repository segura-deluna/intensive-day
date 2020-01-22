const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');




gulp.task('scss', function () {
	return gulp.src('./src/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/css/'))
		.pipe(browserSync.stream());
});


gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: './src/'
		}
	})
});


gulp.task('watch', function () {
	watch(['./src/**/*.html', './src/**/*.js', './src/img/**/*.*'],
		gulp.parallel(browserSync.reload)
	);

	watch('./src/scss/**/*.scss', function () {
		setTimeout(gulp.parallel('scss'), 1000);
	});
});




gulp.task('default', gulp.series('scss', gulp.parallel('server', 'watch')));