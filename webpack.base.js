const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    RevQueue: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd2'
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  }
}

module.exports = config;