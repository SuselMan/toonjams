import mongoose from 'mongoose';
import crypto, {BinaryLike} from 'crypto';
import '../entities/User';

const User = mongoose.model('User');

export const createUser = ({login, password} : {login: String, password: String}): Promise<any> => {
    const user = {
        login,
        password: hash(password)
    };
    return new User(user).save();
};

// TODO: i don't think that is secure enough, check modern password storing methods
function hash(text: String) {
    return crypto.createHash('sha1')
        .update(text as BinaryLike).digest('base64')
}
