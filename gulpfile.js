const gulp = require('gulp')
const fiber = require('fibers')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const htmlMinifier = require('gulp-html-minifier')
const imagemin = require('gulp-imagemin')
const del = require('del')

const browserSync = require('browser-sync').create()

gulp.task('views', () => {
    return gulp.src('src/pages/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('out/'));
});

gulp.task('html', () => {
    return gulp.src('src/pages/*.pug')
        .pipe(pug({}))
        .pipe(htmlMinifier({
            removeComments: true,
            collapseWhitespace: true,
            removeTagWhitespace: true
        }))
        .pipe(gulp.dest('out/'))
});

gulp.task('images', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('out/img/'))
);

gulp.task('fonts', () =>
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('out/fonts/'))
);

gulp.task('less', () =>
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css/'))
);

gulp.task('copy', () =>
    gulp.src('src/dist/**/*')
        .pipe(gulp.dest('dist/'))
)

gulp.task('css', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass({ fiber })).on('error', sass.logError)
        .pipe(cssnano())
        .pipe(gulp.dest('out/css'))
)

gulp.task('clean', (cb) => del.sync('dist',cb))

// task to reload browserSync
gulp.task('reloadBrowserSync', () => browserSync.reload())
gulp.task('browserSync', () =>
    browserSync.init({
        reloadDelay: 2000,
        server: { baseDir: './out' }
    })
)

gulp.task('build', ['views', 'css', 'images', 'fonts', 'copy'])
gulp.task('watch', ['build', 'browserSync'], () => gulp.watch('src/**/*', ['build', ['build', 'reloadBrowserSync']]))
gulp.task('cleanandbuild', ['clean', 'build'])
gulp.task('default', ['cleanandbuild'])
