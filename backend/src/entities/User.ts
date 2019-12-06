import { NextFunction } from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface UserModel extends mongoose.Document {
    permissions: string
    login: string
    password: string
    createdAt: Date
    modifiedAt: Date
    banned: boolean
}

const ModelSchema = new Schema({
    permissions: {type: String},
    // TODO: Do we need user's email?
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    banned: {
        type: Boolean,
        required: false
    }
}).pre<UserModel>('save', function (next: NextFunction) {
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const Model = mongoose.model('User', ModelSchema)
