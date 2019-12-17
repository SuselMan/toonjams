import { USER_PERMISSIONS } from '@apptypes/UserTypes'
import { UserModel } from '@entities/User'
import crypto, { BinaryLike } from 'crypto'
import mongoose, { Document, DocumentQuery } from 'mongoose'
import '../entities/User'

const User = mongoose.model('User')

export const createUser = ({login, password}: {login: string, password: string}): Promise<any> => {
    const user = {
        login,
        password: hash(password),
        permissions: USER_PERMISSIONS.USER
    }
    return new User(user).save()
}

export const checkSession = (id: string): Promise<any> => {
    return User.findById(id)
    .then((user) => {
        return user ? {...user.toJSON(), password: undefined } : undefined
    })
}

export function checkUserCredentials(userData: { login: string, password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
        User
            .findOne({login: userData.login})
            .then((doc) => {
                const user = doc ? doc.toJSON() : undefined
                if (user && user.password === hash(userData.password)) {
                    return resolve({ ...user, password: undefined })
                } else {
                    return reject('Wrong username or password')
                }
            })
            .catch(() => {
                return reject('Wrong username or password')
            })
    })
}

// TODO: i don't think that is secure enough, check modern password storing methods
function hash(text: string) {
    return crypto.createHash('sha1')
        .update(text as BinaryLike).digest('base64')
}
