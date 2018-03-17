const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/entry.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        loader: ['json-loader'],
        test: /\.json$/,
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        include: path.join(__dirname, 'src/assets/images/'),
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
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
    historyApiFallback: true,
    contentBase: 'public'
  }
};

