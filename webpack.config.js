var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry:path.join(__dirname,'src/entry.js'),
    output: {
        path : path.join(__dirname, 'build'),
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                loader: ['json-loader'],
                test: /\.json$/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!css'
            }
        ]
    },
    resolve: {
        extensions: ["", ".jsx", ".js", ".json"]
    },
    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        contentBase: 'build'
    }
};

