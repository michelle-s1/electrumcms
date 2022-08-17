'use strict';

/**
 * inventory-action service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::inventory-action.inventory-action');
