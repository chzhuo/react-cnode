/**
 * Created by zhuo on 16/3/24.
 */

var clean = require("gulp-clean");
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var process = require("process");


gulp.task("clean",function(){
   gulp.src("dist").pipe(clean());
});

gulp.task("webpack-dev-server", function(callback) {
   process.env.NODE_ENV = "production";
   // Start a webpack-dev-server
   var webpackConfig = require("./webpack.config");
   webpackConfig.devtool='source-map';
   webpackConfig.debug = true;
   var compiler = webpack(webpackConfig);

   new WebpackDevServer(compiler, {
      // server and middleware options
   }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

      // keep the server alive or continue?
      // callback();
   });
});

gulp.task("webpack",["clean"], function(callback) {
   var webpackConfig = require("./webpack.config");
   //注入环境变量
   webpackConfig.plugins.push(new webpack.DefinePlugin({
          'process.env': {
             'NODE_ENV': '"production"'
          }
       }),new webpack.optimize.UglifyJsPlugin(),
       new webpack.optimize.DedupePlugin());

   // run webpack
   webpack(webpackConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
         // output options
      }));
      callback();
   });
});
gulp.task("build",["webpack"]);