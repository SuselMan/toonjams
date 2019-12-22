//  TODO: figure out how ge going to upload media
// as option we can check youtube api for video and imgur api for gifs

import { NextFunction } from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface MediaModel extends mongoose.Document {
    url: string
    description: string
    event: string
    user: string
    createdAt: Date
    modifiedAt: Date
}

const ModelSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    event: {
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
}).pre<MediaModel>('save', function (next: NextFunction) {
    const isModelValid = isValid(this)
    if (!isModelValid) { throw new Error(`Wrong Media model was provided: ${{ ...this }}`) }
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const isValid = (model: any) => {
    // TODO: properly validate MediaModel (check is url allowed if figure out upload methods)
   return true
}

const Model = mongoose.model('Media', ModelSchema)
