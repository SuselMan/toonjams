import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as eventActions from '@actions/event'

const router = express.Router()

router.post('/createEvent', (req: Request, res: Response, next) => {
    eventActions.createEvent(req.body)
        .then(() => {
            res.status(200).send('ok')
        })
        .catch((err: MongoError) => {
            next(err)
        })
})

router.get('/getEvent/:id', (req: Request, res: Response, next) => {
    eventActions.getEvent(req.params.id)
        .then((obj) => {
            res.status(200).send(obj)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.get('/getEvents', (req: Request, res: Response, next) => {
    eventActions.getEvents(req.query)
        .then((arr) => {
            res.status(200).send(arr)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

export default router