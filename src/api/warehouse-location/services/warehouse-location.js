'use strict';

/**
 * warehouse-location service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::warehouse-location.warehouse-location');
