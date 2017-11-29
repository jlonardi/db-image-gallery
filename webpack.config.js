const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv;

let uiUrl = 'http://localhost';
if (argv.uiUrl !== undefined) {
    uiUrl = argv.uiUrl;
}

let uiPort = 3001;
if (argv.uiPort !== undefined) {
    uiPort = argv.uiPort;
}

let apiUrl = 'http://localhost';
if (argv.apiUrl !== undefined) {
    apiUrl = argv.apiUrl;
}

let apiPort = 3000;
if (argv.apiPort !== undefined) {
    apiPort = argv.apiPort;
}

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
    },
    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            title: 'Dropbox Image Gallery',
            uiUrl,
            uiPort,
            apiUrl,
            apiPort,
            template: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ]
    }
};
