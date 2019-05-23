const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  devtool: "source-map",
  entry: {
    RevQueue: './src/index.ts',
    RevQueueTests: './src/test/RevQueueTests.ts',
  },
  mode: 'development'
});