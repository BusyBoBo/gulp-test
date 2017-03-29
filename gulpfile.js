var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    SSI = require('browsersync-ssi'),
    minify = require('gulp-minify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer=require('gulp-autoprefixer')
    jade = require('gulp-jade'),
    clean = require('gulp-clean'),
    runSequence = require('gulp-run-sequence'),
    zip = require('gulp-zip');

//监听资源变动，自动刷新页面
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: ["./dist"],
      middleware: SSI({
        baseDir: './dist',
        ext: '.shtml',
        version: '2.10.0'
      })
    }
  });

  gulp.watch("app/scss/**/*.scss", ['sass']);
  gulp.watch("app/js/**/*.js", ['js']);
  gulp.watch("app/jade/*.jade", ['jade']);
  gulp.watch("app/**/*.html", ['html']);
  gulp.watch("app/lib/*.js", ['lib']);
  gulp.watch('app/img/*.{jpg,png,gif}', ['imgmin']);
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});
//编译sass,压缩，加浏览器前缀
gulp.task('sass', function () {
  return gulp.src("app/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});
//压缩js(生成2种版本)
gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(plumber())
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});
//搬运html
gulp.task('html', function () {
  return gulp.src("app/*.html")
    .pipe(plumber())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});
//编译jade
gulp.task('jade', function () {
  return gulp.src("app/jade/**/*.jade")
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});
//搬运插件
gulp.task('lib', function () {
  return gulp.src('app/lib/*.js')
    .pipe(plumber())
    .pipe(gulp.dest("dist/lib"))
});
//仅压缩未缓存图片
gulp.task('imgmin', function () {
  return gulp.src('app/img/*.{jpg,png,gif}')
    .pipe(plumber())
    .pipe(cache(imagemin({
            optimizationLevel: 3,
            interlaced: true,
            progressive: true
    })))
    .pipe(gulp.dest('dist/img'))
})
//生成生产版本压缩包
gulp.task('publish', function () {
  return gulp.src('dist/**/*')
    .pipe(plumber())
    .pipe(zip('publish.zip'))
    .pipe(gulp.dest('release'))
});
//重构dist文件
gulp.task('redist', function () {
  //先运行clean，然后并行运行html,js,sass等
  runSequence('clean', ['html', 'jade', 'js', 'sass', 'lib', 'imgmin']);
});

gulp.task('clean', function () {
  return gulp.src('dist/*', { read: false })
    .pipe(clean());
});

gulp.task('default', ['html', 'serve'])
