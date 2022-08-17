'use strict';

/**
 * website-cart service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::website-cart.website-cart');
