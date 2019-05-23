const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  entry: {
    RevQueue: './src/index.ts',
  },
  mode: 'production',
  output: {
    filename: '[name].min.js'
  },
});