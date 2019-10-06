const { createLogger, transports, format } = require('winston');

const {
  LOG_LEVEL,
  NODE_ENV
} = require('core_variables');

const { printf } = format;
const consoleFormat = printf(({ level, message }) => {
  return `${level}: ${message}`;
});
const fileFormat = printf(({ level, message, label, timestamp }) => {
  return `${level}: ${message} at ${module.filename} in ${timestamp}`;
});

const logger = createLogger({
  level: LOG_LEVEL,
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        consoleFormat
      )
    }),
    new transports.File({
      format: format.combine(
        format.timestamp(),
        fileFormat
      ),
      filename: 'error.log',
      level: 'error'
    })
  ],
});

if (NODE_ENV === 'production') {
  logger.exceptions.handle(
    new transports.File({
      format: format.combine(
        format.timestamp(),
        fileFormat
      ),
      filename: 'exceptions.log',
      level: 'error'
    })
  );
}

module.exports = logger;

logger.info(`LOG_LEVEL = ${LOG_LEVEL}`);
