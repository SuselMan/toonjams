import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Routes from './routes/Routes';
import config from './config/config.json';

import path from 'path';
// @ts-ignore
global.appRoot = path.resolve(__dirname);
// @ts-ignore
global.fronendRoot = path.resolve(__dirname + '../../../frontend/dist');

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.database();
        this.preMiddlewares();
        this.routes();
        this.postMiddlewares();
    }

    // middlewares running before routes
    private preMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.json());
    }

    // middlewares running after routes
    private postMiddlewares(): void {
        this.express.use((err: any, req: any, res: any, next: any) => {
            const response = {
                errors: [],
                message: err.message,
                status: err.status || 400,
            };

            if (err.errors && Array.isArray(err.errors)) {
                response.errors =
                    err.inner
                        .map(({ path, message }: { path: string, message: object }) => ({ [path]: message }))
            }

            res.status(response.status).json(response)
        });

        this.express.use((req: any, res: any) => {
            res.status(200).json(res.response || {})
        })
    }

    private database() {
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
            .then(() => {
                console.log(`Connected to db ${config.db.host}:${config.db.port}/${config.db.name}`)
            });
    }

    private routes() {
        new Routes(this.express);
    }
}
const app = new App().express;

app.listen(config.serverPort, function() {
    console.info(`Server is up and running on port ${config.serverPort}`);
});


export default app