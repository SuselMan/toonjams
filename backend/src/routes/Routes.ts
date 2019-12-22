import express from 'express'

import user from './api/user'
import event from './api/event'
import media from './api/media'

class Routes {
    constructor(app: any) {
        if (!app) { throw new Error('Express app must be provided') }
        // TODO: add this ignore to config
        // @ts-ignore
        app.use(express.static(global.fronendRoot))
        app.use('/api/user', user)
        app.use('/api/event', event)
        app.use('/api/media', media)

        app.get('/favicon.ico', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.appRoot) // load our public/index.html file
        })
        //
        app.get('*', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.fronendRoot + '/index.html')
        })
    }
}

export default Routes