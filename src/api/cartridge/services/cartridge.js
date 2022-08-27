'use strict';

/**
 * cartridge service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cartridge.cartridge');
