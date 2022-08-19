import { check } from 'express-validator'
import validateResult from '../../helpers/validateResult.js'


const resetPasswordValidator = [
    check('email')
        .notEmpty()
        .isEmail(),
    check('password').isLength({ min: 5 }),
    check('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    check('token').notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export default resetPasswordValidator;