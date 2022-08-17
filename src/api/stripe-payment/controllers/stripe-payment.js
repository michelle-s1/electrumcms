'use strict';

/**
 *  stripe-payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stripe-payment.stripe-payment');
