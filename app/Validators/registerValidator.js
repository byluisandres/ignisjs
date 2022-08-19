import { check } from 'express-validator'
import validateResult from '../../helpers/validateResult.js'
import User from '../Models/User.js';

const registerValidator = [
    check('name').notEmpty(),
    check('email')
        .isEmail()
        .custom(async value => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        }),
    check('password').isLength({ min: 5 }),
    check('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export default registerValidator;