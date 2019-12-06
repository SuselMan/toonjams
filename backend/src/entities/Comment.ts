import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ModelSchema = new Schema({
    date: {type: Date},
    text: {type: String,  required: true},
    userId: {type: String,  required: true}
})

const Model = mongoose.model('Comment', ModelSchema)
