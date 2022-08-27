'use strict';

/**
 * electrum-line router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::electrum-line.electrum-line');
