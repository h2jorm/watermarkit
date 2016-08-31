const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    watermarkit: './src/index.js',
  },
  devtool: '#source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Watermarkit',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '#': path.join(__dirname, 'src'),
    },
    extensions: [
      '', '.webpack.js', '.web.js', '.js',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
