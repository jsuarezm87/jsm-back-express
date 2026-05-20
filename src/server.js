const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/database');
const route = require('./constants/routes');
const message = require('./constants/messages');
const { getCorsConfig } = require('./config/cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: route.AUTH,
            customer: route.CUSTOMER
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors(getCorsConfig()));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('./modules/auth/auth.routes'));
        this.app.use(this.paths.customer, require('./modules/customer/customer.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(message.SERVER_RUNNING, this.port);
        });
    }
}

const createServer = () => new Server();

module.exports = { createServer };
