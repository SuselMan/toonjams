import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as userActions from '@actions/user'

const router = express.Router()

router.post('/createUser', (req: Request, res: Response, next) => {
    userActions.createUser(req.body)
        .then(() => {
            res.status(200).send('ok')
        })
        .catch((err: MongoError) => {
            res.status(500).send('This username already exist')
            if (err.code === 11000) {
                res.status(500).send('This username already exist')
            }
            next(err)
        })
})

router.post('/authorizeUser', (req: Request, res: Response, next) => {
    userActions.checkUserCredentials(req.body)
        .then((user) => {
            if (user && user.login && req.session) {
                req.session.user = { id: user._id, login: user.login }
                res.status(200).send('ok')
            } else {
                next('Unexpected error: authorizeUser')
            }
        })
        .catch((err: MongoError) => {
            if (err.code === 11000) {
                res.status(500).send('This username already exist')
            } else {
                next(err)
            }
        })
})

router.get('/getAuthorizedUser', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then((user) => {
                res.status(200).send(user)
            })
            .catch( (e: MongoError) => {
                next(e)
            })
    } else {
        res.status(401).send('Has no session')
    }
})

router.get('/getUser/:id', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        userActions.getUser(req.session.user.id)
            .then(() => userActions.getUser(req.params.id))
            .then((user) => {
                res.status(200).send(user)
            })
            .catch((e: MongoError) => {
                next(e)
            })
    } else {
        res.status(401).send('Has no session')
    }
})

router.get('/logoutUser', (req: Request, res: Response, next) => {
    if (req && req.session && req.session.user && req.session.user.id) {
        req.session = undefined
        res.status(200).send('ok')
    } else {
        res.status(401).send('User is not logged in')
    }
})

router.get('/getUsers', (req: Request, res: Response, next) => {
    userActions.getUsers(req.query)
        .then((users) => {
            res.status(200).send(users)
        })
        .catch( (e: MongoError) => {
            next(e)
        })
})

export default router