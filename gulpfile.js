// Include gulp
var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , plumber = require('gulp-plumber')
  , gutil = require('gulp-util')
  , react = require('gulp-react')
  , babel = require('gulp-babel')
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass');

gulp.task('react', function () {
  return gulp.src('jsx/*.jsx')
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(
          gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(react({harmony: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/js'))
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/**.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(
          gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(sass({
      // outputStyle: 'compressed',
      outputStyle: 'nested',
      sourceComments: 'map',
      includePaths: []
    }))
    .pipe(plumber.stop())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('jsx/*.jsx', ['react']);  
  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['watch']);

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
function displayError(error) {
  // Initial building up of the error
  var errorString = '[' + error.plugin + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
  // If the error contains the filename or line number add it to the string
  if(error.fileName)
      errorString += ' in ' + error.fileName;
  if(error.lineNumber)
      errorString += ' on line ' + error.lineNumber;
  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
  this.emit('end');
}