import express from 'express'

import user from './api/user'
import event from './api/event'
import media from './api/media'
import comment from './api/comment'
import voting from './api/voting'
import photo from './api/photo'
import path from 'path'

class Routes {
    constructor(app: any) {
        if (!app) { throw new Error('Express app must be provided') }
        // TODO: add this ignore to config
        // @ts-ignore
        app.use(express.static(global.frontendRoot))
        app.use('/api/user', user)
        app.use('/api/event', event)
        app.use('/api/media', media)
        app.use('/api/comment', comment)
        app.use('/api/voting', voting)
        app.use('/api/photo', photo)

        app.get('/favicon.ico', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.appRoot + '/favicon.ico')
        })

        app.get('/api/uploads/:id', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.uploadsRoot + '/' + req.params.id)
        })

        app.get('*', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.frontendRoot + '/index.html')
        })
    }
}

export default Routes