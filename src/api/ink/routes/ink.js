'use strict';

/**
 * ink router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::ink.ink');
