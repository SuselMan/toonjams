import { CommentModel } from '@entities/Comment'
import mongoose, { Document, DocumentQuery } from 'mongoose'
import '../entities/Media'
import '../entities/Comment'
import '../entities/User'

const Media = mongoose.model('Media')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

export const createComment = ({text, user, media}: CommentModel): Promise<any> => {
    // TODO: add user is admin checking
    if (!event || !user) { throw new Error('Event and User are required parameters') }
    const obj = {text, user, media}
    return Promise.all([Media.findById(media), User.findById(user)])
        .then(([mda, usr]) => {
            if (!mda || !usr) { throw new Error('Media and User are required parameters') }
            return new Comment(obj).save()
        })
}

export const getComment = (id: string): Promise<any> => {
    return Comment.findById(id)
        .then((res) => {
            return res ? {...res.toJSON()} : undefined
        })
}

export const getComments = (query: any): Promise<any> => {
    // TODO: add query filters and return metadata only
    return  Comment.find()
        .then((res) => {
            return res && res.length ? res.map((item) => ({...item})) : undefined
        })
}

export const deleteComment = (id: string) => {
    return Comment.findById(id).remove()
}
