import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as votingAction from '@actions/voting'
import * as userActions from '@actions/user'

const router = express.Router()

router.post('/createVoting', (req: Request, res: Response, next) => {
    // TODO: add is admin checking
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                return votingAction.createVoting({...req.body, user: user._id })
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

router.post('/createVote', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                return votingAction.createVote({...req.body, user: user._id })
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

router.post('/createVoteOption', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                return votingAction.createVoteOption({...req.body, user: user._id })
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

router.get('/getVoting/:id', (req: Request, res: Response, next) => {
    votingAction.getVoting(req.params.id)
        .then((obj) => {
            res.status(200).send(obj)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

router.get('/getVoteOptions', (req: Request, res: Response, next) => {
    votingAction.getVoteOptions(req.query)
        .then((arr) => {
            res.status(200).send(arr)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

export default router