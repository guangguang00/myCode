// 引入gulp模块
// commonjs规范引用模块
// //这里创建gulp的任务，为了调用gulp的插件
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compileSass',function(){
	//先查找sass文件所在的位置
	gulp.src('web/src/sass/*.scss')

 	// 通过pipe 方法导入到 gulp 的插件中实现编译sass
	.pipe(sass({outputStyle:'compact'}).on('error', sass.logError))

	// 把编译后的文件输出
	.pipe(gulp.dest('web/src/css'));
	
})
// 监听文件修改，执行相应任务
gulp.task('jtSass',function(){
	// 监听sass文件，如果有修改，则编译
	gulp.watch('web/src/sass/*.scss',['compileSass']);
});
 
// 用于js文件的压缩
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
// gulp.task('compressJS',function(){
// 	gulp.src('webapp/js/*.js')

	// 合并
	// .pipe(concat('page.js'))

	// 输入合并后但未压缩的版本
	// .pipe(gulp.dest('dist/js/'))

	// 压缩
	// .pipe(uglify({
	// 	mangle:false,
	// 	compress:false
	// }))

	// 重命名
	// .pipe(rename({
	// 	suffix:'.min'
	// }))

	// 输出
// 	// .pipe(gulp.dest('dist/js/'))
// });


//同步任务
 var browserSync=require('browser-sync');
 gulp.task('server',function(){
 	//为目标目录创建服务器
 	browserSync({
 		//把当前目录下的src变成服务器
 		server:"./web",
 		// 实现服务器代理
 		// proxy:"http://localhost/myproject1/",
 		//设置自定义端口
 		//port:999,
 		//监听的内容
 		files:['./web/*.html','./web/src/html/*.html','./web/src/css/*.css']
 	});
 	gulp.watch('web/src/sass/*.scss',['compileSass']);
 	//然后在命令框输入 gulp server
 });