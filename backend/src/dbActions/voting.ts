import { VotingModel } from '@entities/Vote/Voting'
import { VoteModel } from '@entities/Vote/Vote'
import { VoteOptionModel } from '@entities/Vote/VoteOption'
import mongoose, { Document, DocumentQuery } from 'mongoose'
import { VOTING_TYPE } from '@apptypes/VotingTypes'

import '../entities/Media'
import '../entities/Event'
import '../entities/User'
import '../entities/Vote/Voting'
import '../entities/Vote/Vote'
import '../entities/Vote/VoteOption'

const Media = mongoose.model('Media')
const Event = mongoose.model('Event')
const User = mongoose.model('User')
const Voting = mongoose.model('Voting')
const Vote = mongoose.model('Vote')
const VoteOption = mongoose.model('VoteOption')

export const createVoting = ({linkedID, linkedType, maxValue, title, isActive}: VotingModel): Promise<any> => {
    // TODO: add user is admin checking
    if (!linkedID || !Object.values(VOTING_TYPE).find(i => linkedType === i) || !title) {
        throw new Error('Missed required parameters')
    }
    const obj = {
        linkedID,
        linkedType,
        maxValue,
        title,
        isActive }

    let linkedTarget
    switch (linkedType) {
        case VOTING_TYPE.EVENT:
            linkedTarget = Event
            break
        case VOTING_TYPE.MEDIA:
            linkedTarget = Media
            break
        default:
            throw new Error('Wrong Voting linked type')
            break
    }

    return Promise.all([linkedTarget.findById(linkedID)])
        .then(([linkedEntity]) => {
            if (!linkedEntity) { throw new Error(`Wrong ${linkedType} id`) }
            return new Voting(obj).save()
        })
}

export const createVoteOption = ({text, voting, user}: VoteOptionModel): Promise<any> => {
    if (!user || !voting) { throw new Error('Missed required parameters') }
    const obj = {
        text,
        voting,
        user
    }

    return Promise.all([Voting.findById(voting), User.findById(user)])
        .then(([voting, user]) => {
            if (!voting || ! user) { throw new Error(`Wrong voting or user id`) }
            return new VoteOption(obj).save()
        })
}

export const createVote = ({value, voteOption, user}: VoteModel): Promise<any> => {
    if (!value || !voteOption || !user) {
        throw new Error('Missed required parameters')
    }
    const obj = { value, voteOption, user }

    return Promise.all([VoteOption.findById(voteOption), User.findById(user)])
        .then(([voteOpt, usr]) => {
            if (!voteOpt || !usr) { throw new Error(`Wrong voteOption or User id`) }
            return new Vote(obj).save()
        })
}

export const getVoting = (id: string): Promise<any> => {
    return Voting.findById(id)
        .then((res) => {
            return res ? {...res.toJSON()} : undefined
        })
}

export const getVoteOptions = (query: any): Promise<any> => {
    // TODO: add query filters and return metadata only
    return  VoteOption.find()
        .then((res) => {
            return res && res.length ? res.map((item) => ({...item})) : undefined
        })
}
