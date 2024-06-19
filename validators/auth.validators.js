const { body } = require('express-validator');

const userValidators = {};
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

userValidators.register = [
    body('name')
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name format must b string'),
    body('email')
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email format must be an email'),
    body('password')
    .notEmpty().withMessage('password is required')
    .matches(passwordRegexp).withMessage('password format incorrect'),
    body('gender')
    .notEmpty().withMessage('gender is required')
    .isString().withMessage('gender format must be a String')
]

module.exports = userValidators;