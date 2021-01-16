const winston = require('winston');

const dateFormat = () => new Date(Date.now()).toUTCString();

const createLogger = (route) => winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `./logs/${route}.log`,
    }),
  ],
  format: winston.format.printf((info) => {
    let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
    message = info.obj ? `${message}data:${JSON.stringify(info.obj)} | ` : message;
    message = this.log_data ? `${message}log_data:${JSON.stringify(this.log_data)} | ` : message;
    return message;
  }),
});

module.exports = {
  info: (route, message, obj) => {
    const logger = createLogger(route);
    logger.log('info', message, { obj });
  },

  debug: (route, message, obj) => {
    const logger = createLogger(route);
    logger.log('debug', message, { obj });
  },

  error: (route, message, obj) => {
    const logger = createLogger(route);
    logger.log('error', message, { obj });
  },
};
