const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function conf(config) {
    config.set({
        browsers: ['Chrome'], // run in Chrome
        frameworks: ['mocha'], // use the mocha test framework
        files: [
            // only specify one entry point
            // and require all tests in there
            'src/test.bundle.js'
        ],
        // list of preprocessors
        preprocessors: {
            'src/test.bundle.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'eval',
            resolve: {
                extensions: ['.js', '.jsx', '.css'],
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

            },
            plugins: [
                new ExtractTextPlugin('style.css', { allChunks: true })
            ]
        },
        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['mocha'],
        // web server port
        // port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        plugins: [
            require('karma-sourcemap-loader'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-webpack')
        ]
    });
};
