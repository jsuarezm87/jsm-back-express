require('dotenv').config();
const Server = require('./models/server');

const requiredEnv = ['PORT', 'CONNECTION_STRING', 'SECRET_JWT'];
const missingEnv = requiredEnv.filter((envVar) => !process.env[envVar]);

if (missingEnv.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

const server = new Server();

server.listen();
