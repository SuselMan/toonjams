import { NextFunction } from 'express'
import mongoose from 'mongoose'
import { VOTING_TYPE } from '@apptypes/VotingTypes'

const Schema = mongoose.Schema

export interface VotingModel extends mongoose.Document {
    linkedID: string
    linkedType: string
    maxValue: number
    title: string
    isActive: boolean
    createdAt: Date
    modifiedAt: Date
}

const ModelSchema = new Schema({
    linkedID: {
        type: String,
        required: true
    },
    linkedType: {
        type: String,
        required: true
    },
    maxValue: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre<VotingModel>('save', function (next: NextFunction) {
    const isModelValid = isValid(this)
    if (!isModelValid) { throw new Error(`Wrong Voting model was provided: ${{ ...this }}`) }
    if (typeof this.isActive !== 'boolean') { this.isActive = false }
    if (!this.maxValue) { this.maxValue = 5 }
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const isValid = (model: any) => {
    if (!model.title || !model.title.length) { return false }
    return true
}

const Model = mongoose.model('Voting', ModelSchema)
