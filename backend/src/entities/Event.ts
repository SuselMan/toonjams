import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ModelSchema = new Schema({
    status: {type: String},
    theme: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    posterUrl: {type: String}
})

const Model = mongoose.model('Event', ModelSchema)
