const gulp = require('gulp');
const $    = require('gulp-load-plugins')();
const mainBowerFiles = require('main-bower-files');

gulp.task('bower', function() {
  return gulp
    .src(mainBowerFiles({ filter: /\.js$/ }))
    .pipe(gulp.dest('public/javascripts'))
});

const imagesDir = 'src/images';

gulp.task('images', function() {
  return gulp.src(`${imagesDir}/**/*`)
    .pipe(gulp.dest('public/images'))
});

const sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

const stylesheetsDir = 'src/stylesheets';

gulp.task('sass', function() {
  return gulp.src(`${stylesheetsDir}/index.s*ss`)
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch-sass', ['sass'], function() {
  return gulp.watch([`${stylesheetsDir}/**/*.scss`], ['sass']);
});

gulp.task('watch-js', ['js'], function() {
  return gulp.watch([`${javascriptsDir}/**/*.js`], ['js']);
});

const javascriptsDir = 'src/javascripts';

gulp.task('js', function() {
  return gulp.src(`${javascriptsDir}/**/*.js`)
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('build', ['images', 'sass', 'bower', 'js']);

gulp.task('default', ['build', 'watch-sass', 'watch-js']);
