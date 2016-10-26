var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry:path.join(__dirname,'src/entry.js'),
    output: {
        path : path.join(__dirname, 'public'),
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
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: 'file?name=[path][name].[hash].[ext]',
              include: path.join(__dirname, 'src/assets/images/'),
            }
        ]
    },
    resolve: {
        extensions: ["", ".jsx", ".js", ".json"],
      alias: {
        src: path.resolve(__dirname, 'src'),
        images: path.resolve(__dirname, 'src/assets/images'),
        matrix: path.resolve(__dirname, 'src/matrix')
      }
    },
    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        contentBase: 'build'
    }
};

