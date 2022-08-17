'use strict';

const _ = require('lodash');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (config) => {
  config.plugins.push(new MonacoWebpackPlugin());
  _.set(config, 'resolve.alias.assets', path.resolve(__dirname, './assets'));


  return config;
};