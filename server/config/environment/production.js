'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  OAUTH_SERVER: process.env.OAUTH_SERVER ,
  OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT ,
  ACCOUNTS_CLIENT: process.env.ACCOUNTS_CLIENT ,
  ACCOUNTS_SECRET: process.env.ACCOUNTS_SECRET ,
  HIRE_CLIENT: process.env.HIRE_CLIENT ,
  HIRE_SECRET: process.env.HIRE_SECRET ,
  HIRE_REDIRECT_URI: process.env.HIRE_REDIRECT_URI ,
  PARTNER_CLIENT: process.env.PARTNER_CLIENT ,
  PARTNER_SECRET: process.env.PARTNER_SECRET ,
  PARTNER_REDIRECT_URI: process.env.PARTNER_REDIRECT_URI ,
};
