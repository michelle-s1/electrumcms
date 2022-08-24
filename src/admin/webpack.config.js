'use strict';

const _ = require('lodash');
const path = require('path');

/* eslint-disable no-unused-vars */
module.exports = (config) => {
  // this includes the folder ./src/admin/assets with the alias assets
  _.set(config, 'resolve.alias.assets', path.resolve(__dirname, './assets'));
  return config;
};