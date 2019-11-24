import express from 'express';
import * as userActions from '../../dbActions/user';

const router = express.Router();

router.post('/createUser', (req, res, next) => {
    console.log('CREATE USED!');
    userActions.createUser(req.body)
        .then((result) => {
            console.log('result', result);
            res.status(200).send('ok');
        })
        .catch((err: any) => {
            console.log(err);
            if (err.code == 11000) {
                res.status(500).send("This username already exist")
            }
        });
});

export default router;