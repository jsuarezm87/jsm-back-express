const { createServer } = require('./server');
const { validateEnv } = require('./config/env');

const bootstrap = () => {
  validateEnv();
  const server = createServer();
  server.listen();
};

module.exports = { bootstrap };
