'use strict';

/**
 * electrum-line controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::electrum-line.electrum-line');
