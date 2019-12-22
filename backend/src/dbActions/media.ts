import { MediaModel } from '@entities/Media'
import mongoose, { Document, DocumentQuery } from 'mongoose'
import '../entities/Media'
import '../entities/Event'
import '../entities/User'

const Media = mongoose.model('Media')
const Event = mongoose.model('Event')
const User = mongoose.model('User')

export const createMedia = ({url, description, event, user}: MediaModel): Promise<any> => {
    // TODO: add user is admin checking
    if (!event || !user) { throw new Error('Event and User are required parameters') }
    const obj = {url,
        description,
        event,
        user
    }
    return Promise.all([Event.findById(event), User.findById(user)])
        .then(([evt, usr]) => {
            if (!evt || !usr) { throw new Error('Event and User are required parameters') }
            return new Media(obj).save()
        })
}

export const getMedia = (id: string): Promise<any> => {
    return Media.findById(id)
        .then((res) => {
            return res ? {...res.toJSON()} : undefined
        })
}

export const getMedias = (query: any): Promise<any> => {
    // TODO: add query filters and return metadata only
    return  Media.find()
        .then((res) => {
            return res && res.length ? res.map((item) => ({...item})) : undefined
        })
}

export const deleteMedia = (id: string) => {
    return Media.findById(id).remove()
}
