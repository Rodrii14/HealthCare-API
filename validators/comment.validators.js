const { body } = require('express-validator');

const commentValidator = {};

commentValidator.create = [
    body('content')
    .notEmpty().withMessage('content is required')
    .isString().withMessage('content format must be a String')
    .isLength({ min:1, max: 240 })
]

module.exports = commentValidator;