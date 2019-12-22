import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as commentAction from '@actions/comment'
import * as userActions from '@actions/user'

const router = express.Router()

router.post('/createMedia', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                return commentAction.createComment({...req.body, user: user._id })
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

router.get('/getComment/:id', (req: Request, res: Response, next) => {
    commentAction.getComment(req.params.id)
        .then((obj) => {
            res.status(200).send(obj)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.get('/getComments', (req: Request, res: Response, next) => {
    commentAction.getComments(req.query)
        .then((arr) => {
            res.status(200).send(arr)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.delete('/deleteComment/:id', (req: Request, res: Response, next) => {
    // TODO: add checking user is owner or admin
    commentAction.deleteComment(req.params.id)
        .then(() => {
            res.status(200).send('ok')
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

export default router