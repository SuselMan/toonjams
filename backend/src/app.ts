import bodyParser from 'body-parser'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import config from './config/config.json'
import Routes from './routes/Routes'

import path from 'path'
// @ts-ignore
global.appRoot = path.resolve(__dirname)
// @ts-ignore
global.uploadsRoot = path.resolve(__dirname + '../../uploads')
// @ts-ignore
global.frontendRoot = path.resolve(__dirname + '../../../frontend/dist')

const MongoStore = connectMongo(session)

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.database()
        this.preMiddlewares()
        this.routes()
        this.postMiddlewares()
    }

    // middlewares running before routes
    private preMiddlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'bo so why he goes but not me?',
            store: new MongoStore({
                url: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
            })
        }))
        this.express.use(bodyParser.json())
    }

    // middlewares running after routes
    private postMiddlewares(): void {
        this.express.use((err: any, req: any, res: any, next: any) => {
            const response = {
                errors: [],
                message: err.message,
                status: err.status || 400,
            }

            if (err.errors && Array.isArray(err.errors)) {
                response.errors =
                    err.inner
                        .map(({ path, message }: { path: string, message: object }) => ({ [path]: message }))
            }

            res.status(response.status).json(response)
        })

        this.express.use((req: any, res: any) => {
            res.status(200).json(res.response || {})
        })
    }

    private database() {
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
            .then(() => {
                console.info(`Connected to db ${config.db.host}:${config.db.port}/${config.db.name}`)
            })
    }

    private routes() {
        return new Routes(this.express)
    }
}
const app = new App().express

app.listen(config.serverPort, () => {
    console.info(`Server is up and running on port ${config.serverPort}`)
})

export default app