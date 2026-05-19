const Server = require('../models/server');

const createServer = () => new Server();

module.exports = { createServer };
