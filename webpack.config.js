const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: "source-map",
  entry: {
    RevQueue: './src/index.ts',
    RevQueueTests: './src/test/RevQueueTests.ts',
  },
  mode: "development",
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
      '.tsx',
      '.ts',
      '.js'
    ]
  }
}

module.exports = config;