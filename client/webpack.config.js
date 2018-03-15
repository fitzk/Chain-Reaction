const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/entry.js'),
  output: {
    path: path.join(__dirname, 'public'),
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
          presets: ['env']
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
      pages: path.resolve(__dirname, 'src/pages'),
      state: path.resolve(__dirname, 'src/state'),
      containers: path.resolve(__dirname, 'src/containers'),
      components: path.resolve(__dirname, 'src/components'),
      images: path.resolve(__dirname, 'src/assets/images')
    }
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    contentBase: 'build'
  }
};

