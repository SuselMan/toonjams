import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    }
});

const Model = mongoose.model('User', ModelSchema);
