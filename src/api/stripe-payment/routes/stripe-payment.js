'use strict';

/**
 * stripe-payment router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stripe-payment.stripe-payment');
