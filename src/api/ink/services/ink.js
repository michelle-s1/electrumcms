'use strict';

/**
 * ink service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ink.ink');
