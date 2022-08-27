'use strict';

/**
 * cartridge router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cartridge.cartridge');
