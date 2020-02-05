import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as mediaActions from '@actions/media'
import * as userActions from '@actions/user'

const router = express.Router()

router.post('/createMedia', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                return mediaActions.createMedia({...req.body, user: user._id })
                    .then(() => {
                        res.status(200).send('ok')
                    })
                    .catch((err: MongoError) => {
                        next(err)
                    })
            })
            .catch( (e: MongoError) => {
                next(e)
            })
    } else {
        res.status(401).send('Has no session')
    }
})

router.get('/getMedia/:id', (req: Request, res: Response, next) => {
    mediaActions.getMedia(req.params.id)
        .then((obj) => {
            res.status(200).send(obj)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.get('/getMedias', (req: Request, res: Response, next) => {
    mediaActions.getMedias(req.query)
        .then((arr) => {
            res.status(200).send(arr)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.delete('/deleteMedia/:id', (req: Request, res: Response, next) => {
    // TODO: add checking user is owner or admin
    mediaActions.deleteMedia(req.params.id)
        .then(() => {
            res.status(200).send('ok')
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

export default router