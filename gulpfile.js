var gulp = require("gulp")
var sass = require("gulp-sass")
var autoprefixer = require("gulp-autoprefixer")
var minify = require("gulp-minify-css")
var rename = require("gulp-rename")

var config = {
	srcCSS : 'src/css/*.scss',
	buildCSS : 'build/css'
}

gulp.task('build-css', function(cb){
	gulp.src(config.srcCSS)

		// Output non-minified CSS file
		.pipe(sass({
		  outputStyle : 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.buildCSS))

		// Minify the CSS file
		.pipe(minify())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest(config.buildCSS))

		cb()

})

gulp.task('watch', function(cb){
	gulp.watch(config.srcCSS, ['build-css'])
})

gulp.task('default',['build-css','watch'])