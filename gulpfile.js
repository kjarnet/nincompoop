var gulp = require('gulp'),
    jade = require('gulp-jade'), // template language
    data = require('gulp-data'), // attatch data to stream
    rename = require('gulp-rename'); // Rename stream

gulp.task('data', function () {
  return gulp.src('./settings.json').
    // TODO: Accumulate front-matter from all posts and pages.
    pipe(rename('accumulateddata.json')).
    pipe(gulp.dest('./_site/'));
});

gulp.task('templates', ['data'], function () {
  //console.log('Hello gulp!');
  return gulp.src('./layout/*.jade').
    pipe(data(function(file) {
      // return {"blogtitle" : "Hello Nincompoop", "author" : "Wonko" };
      return require('./_site/accumulateddata.json');
    })).
    /**/
    //pipe(jade({data: {blogtitle: 'fjas', author: 'fjas'}})).
    pipe(jade({pretty: true, debug: true})).
    pipe(gulp.dest('./_site/'));
});


gulp.task('default', ['templates']);
