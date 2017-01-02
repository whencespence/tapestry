const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload= browserSync.reload;


gulp.task('styles',() => {
	return gulp.src('./styles/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(autoprefixer())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./styles/'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts',() => {
	return gulp.src('scripts/main.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('scripts/'))
});

gulp.task('browserSync', () => {
	browserSync.init({
		server:'.'
		})
});

gulp.task('watch', () => {
	gulp.watch('styles/*.scss', ['styles']);
	gulp.watch('scripts/*.js',['scripts']);
	gulp.watch('index.html',reload);
});

gulp.task('default', ['browserSync','scripts','styles','watch']);