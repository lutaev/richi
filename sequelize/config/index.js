const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const logger = require('util/logger');

const {
  PG_SQL_USER, PG_SQL_PASSWORD, PG_SQL_HOST, PG_SQL_DB,
  PG_SQL_TEST_USER, PG_SQL_TEST_PASSWORD, PG_SQL_TEST_HOST, PG_SQL_TEST_DB
} = process.env;

module.exports = {
  test: {
    username: PG_SQL_TEST_USER,
    password: PG_SQL_TEST_PASSWORD,
    host: PG_SQL_TEST_HOST,
    database: PG_SQL_TEST_DB,
    dialect: 'postgres',
    logging: msg => logger.debug(msg)
  },
  development: {
    username: PG_SQL_USER,
    password: PG_SQL_PASSWORD,
    host: PG_SQL_HOST,
    database: PG_SQL_DB,
    dialect: 'postgres',
    logging: msg => logger.info(msg),
    dialectOptions: {
      encrypt: true
    }
  },
  production: {
    username: PG_SQL_USER,
    password: PG_SQL_PASSWORD,
    database: PG_SQL_DB,
    dialect: 'postgres',
    logging: msg => logger.info(msg),
    dialectOptions: {
      encrypt: true
    }
  }
};
