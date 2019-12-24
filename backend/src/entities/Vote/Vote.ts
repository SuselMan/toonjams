import { NextFunction } from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface VoteModel extends mongoose.Document {
    value: number
    voteOption: string
    user: string
    createdAt: Date
    modifiedAt: Date
}

const ModelSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    voteOption: {
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
}).pre<VoteModel>('save', function (next: NextFunction) {
    const isModelValid = isValid(this)
    if (!isModelValid) { throw new Error(`Wrong Vote model was provided: ${{ ...this }}`) }
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const isValid = (model: any) => {
    // TODO: do we need to validate it somehow
    return true
}

const Model = mongoose.model('Vote', ModelSchema)
