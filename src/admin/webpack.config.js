'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config) => {
  
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  return config;
  
  webpack:{(config, { isServer }) => {
    if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
            fs: false
        }
    }}
  }
};
