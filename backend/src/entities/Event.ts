import { NextFunction } from 'express'
import mongoose from 'mongoose'
import { EVENT_STATUS } from '@apptypes/EventTypes'

const Schema = mongoose.Schema

export interface EventModel extends mongoose.Document {
    theme: string
    startDate: Date
    endDate: Date
    createdAt: Date
    modifiedAt: Date
    posterURL: string
    state: string
}

const ModelSchema = new Schema({
    theme: {type: String},
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    posterURL: {
        type: String
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    },
    state: {
        type: String,
        required: false
    }
}).pre<EventModel>('save', function (next: NextFunction) {
    const isModelValid = isValid(this)
    if (!isModelValid) { throw new Error(`Wrong Event model was provided: ${{ ...this }}`) }
    if (!this.state) { this.state = EVENT_STATUS.CLOSED }
    if (this.isNew) {
        this.createdAt = new Date()
    } else {
        this.modifiedAt = new Date()
    }
    next()
})

const isValid = (model: any) => {
    const stateValid = !model.state || Object.values(EVENT_STATUS).find(i => i === model.state)
    if (stateValid) { return true }
    return false
}

const Model = mongoose.model('Event', ModelSchema)
