var gulp        = require('gulp');
var browserSync = require('browser-sync').create(); 
gulp.task('browser-sync', function() {
    var files = [
    'app/**/*.html',
    'app/**/*.css',
    'app/**/*.js'
    ];
    browserSync.init(files,{
     	/*		//
    		proxy:"webserver.servicecenter.clouddev.sjs.ted:8000"
    	//	*/
      	// /*
       		server: { 
            baseDir: "./app"
        }
        //	*/
    });
});
gulp.task('default',['browser-sync']); //定义默认任务 
	
