var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var publicPath = 'http://localhost:9999/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: ['./src/main.js', hotMiddlewareScript],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve('./dist'),
        publicPath: publicPath
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=latest',
        }, {
            test: /\.scss?$/,
            loader: 'style!css!sass',
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    vue:{
        loaders:{
            js:'babel?presets[]=latest'
        }
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        root: path.resolve(__dirname),
        alias: {
            vue : path.join(__dirname,'/node_modules/vue/dist/vue'),
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};