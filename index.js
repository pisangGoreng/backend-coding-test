const { database } = require('./src/configs');
const { logger } = require('./src/helpers');
const server = require('./src/app')(database);

const port = 8010;

server.listen(port, () => logger.info('EXPRESS', `App started and listening on port ${port}`));
