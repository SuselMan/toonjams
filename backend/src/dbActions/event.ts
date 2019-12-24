import { EventModel } from '@entities/Event'
import mongoose, { Document, DocumentQuery } from 'mongoose'
import '../entities/Event'

const Event = mongoose.model('Event')

export const createEvent = ({theme, startDate, endDate, posterURL}: EventModel): Promise<any> => {
    const evt = {
        theme,
        startDate,
        endDate,
        posterURL
    }
    return new Event(evt).save()
}

export const getEvent = (id: string): Promise<any> => {
    return Event.findById(id)
        .then((res) => {
            return res ? {...res.toJSON()} : undefined
        })
}

export const getEvents = (query: any): Promise<any> => {
    // TODO: add query filters and return metadata only
    return  Event.find()
        .then((res) => {
            return res && res.length ? res.map((item) => ({...item})) : undefined
        })
}
