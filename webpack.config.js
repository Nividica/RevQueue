const merge = require('webpack-merge');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');

// Paths
var pathSrc = path.resolve(__dirname, 'src');
var pathSrcTest = path.resolve(pathSrc, 'test');
var pathLibTest = path.resolve(__dirname, 'lib', 'test');

// Extend the base config and add dev options
var devModeConfig = merge(baseConfig, {
  devtool: "source-map",
  mode: 'development'
});

// Extend dev config and add RevQueue
var revQConfig = merge(devModeConfig, {
  entry: { index: path.resolve(pathSrc, 'index.ts') }
});

// Extend dev config and add test files
var testsConfig = merge(devModeConfig, {
  entry: {
    RevQueueTests: path.resolve(pathSrcTest, 'RevQueueTests.ts')
  },
  output: {
    path: pathLibTest
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(pathSrcTest, 'RevQueueTests.html'), to: pathLibTest },
    ]),
  ],
});

module.exports = [revQConfig, testsConfig];