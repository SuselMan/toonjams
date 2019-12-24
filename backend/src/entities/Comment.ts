import { NextFunction } from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface CommentModel extends mongoose.Document {
    text: string
    user: string
    media: string
    createdAt: Date
    modifiedAt: Date
}

const ModelSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre<CommentModel>('save', function (next: NextFunction) {
    const isModelValid = isValid(this)
    if (!isModelValid) { throw new Error(`Wrong Comment model was provided: ${{ ...this }}`) }
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const isValid = (model: any) => {
    if (!model.text || !model.text.length) { return false }
    return true
}

const Model = mongoose.model('Comment', ModelSchema)
