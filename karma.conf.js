var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'tests.webpack.js',
            './site/index.html'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack'],
            './site/components/**/*.js': ['webpack']
        },
        webpack: {
            target: "web",
            debug: true,
            module: {
                loaders: [
                    {
                        test: /\.spec.js$/, loader: 'babel-loader'
                    },
                    {
                        test: /\.*.less$/, loader: 'style-loader!css-loader!less-loader'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        },
        webpackPort: 1234,
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true,
        autoWatch: true,
        browsers: ['Chrome']
    })
};