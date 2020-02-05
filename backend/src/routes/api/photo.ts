import express, { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import * as userActions from '@actions/user'
const router = express.Router()
import multer from 'multer'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const mimeToType = {
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${ file.fieldname }_${ Date.now() }.${ (mimeToType as any)[file.mimetype] }`)
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {
    console.log('filter was called', file)
    if (!Object.keys(mimeToType).find(i => i === file.mimetype)) {
        cb(new Error('Wrong file type'))
    }
    cb(null, true)
}

const upload = multer({ storage, fileFilter, limits: {
    fileSize: MAX_IMAGE_SIZE
    } })

router.post('/upload', (r, res, next) => {
    // TODO: add user session checking
    next()
}, upload.single('image'), (req, res, next) => {
    console.log('file', req.file)
    res.status(200).send(`uploads/${req.file.filename}`)
    // next()
})

export default router