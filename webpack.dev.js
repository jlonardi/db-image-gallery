const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'eval',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
