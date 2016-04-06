var webpack = require("webpack")
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var webpackConfig = {
    context: path.join(__dirname, "src"),
    entry: {
        index: "./index.entry.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['react','es2015']
                }
            },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.scss$/, loaders: ["style", "css", "autoprefixer?{browsers:['last 5 version', 'Firefox 15' ,'safari 5','ie 10','opera 12.1','ios 7','android 4']}", "sass"]},
            {test: /\.(jpg|png|gif|ttf|svg)$/, loaders: ["url?limit=4096"]},
            {test: /\.html$/, loaders: ["html"]},
            {test: /\.mp3$/, loaders: ["file"]},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.template.html",
        })
    ]
}
module.exports = webpackConfig;

