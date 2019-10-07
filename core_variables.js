const { envChecker } = require('./env_checker');

// Environmental variable object
const envVars = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NODE_ENV: process.env.NODE_ENV || 'test',
};

envChecker(envVars);

module.exports = envVars;
