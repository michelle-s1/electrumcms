'use strict';

/**
 * electrum-line service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::electrum-line.electrum-line');
