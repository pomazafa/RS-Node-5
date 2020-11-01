const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  colorize: true,
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize()
    }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

function requestLog(req) {
  logger.log({
    level: 'info',
    message: `Request info: Method - ${req.method}, url - ${
      req.url
    }, query params - ${JSON.stringify(req.query)}, body - ${JSON.stringify(
      req.body
    )}`
  });
}

function errorHandle(err, origin) {
  logger.log({
    level: 'error',
    message: `An error occured: ${err}`
  });
}

process.on('uncaughtException', (err, origin) => {
  errorHandle(err, origin);
});

process.on('unhandledRejection', (err, origin) => {
  errorHandle(err, origin);
});

module.exports = { requestLog, errorHandle };
