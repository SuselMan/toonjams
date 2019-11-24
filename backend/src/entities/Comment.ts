import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    userId: {type: String,  required: true},
    text: {type: String,  required: true},
    date: {type: Date}
});

const Model = mongoose.model('Comment', ModelSchema);
