const { body, param } = require('express-validator');

const videoValidator = {};

videoValidator.create = [
    body('videoBanner')
    .notEmpty().withMessage('video banner is required')
    .isURL().withMessage('video banner must be an url'),
    body('channelName')
    .notEmpty().withMessage('channel name is required')
    .isString().withMessage('channel name format must be a string'),
    body('channelPhoto')
    .notEmpty().withMessage('channel photo is required')
    .isURL().withMessage('channel photo must be an url'),
    body('videoName')
    .notEmpty().withMessage('video name is required')
    .isString().withMessage('video name format must be a string'),
    body('link')
    .notEmpty().withMessage('link is required')
    .isURL().withMessage('link must be an url'),
    body('category')
    .notEmpty().withMessage('category is required')
    .isNumeric().withMessage('category format must be a number')
];

videoValidator.id = [
    param('id')
    .optional()
    .isMongoId().withMessage('id format must be a mongo id')
]

videoValidator.category = [
    param('category')
    .optional()
    .isNumeric().withMessage('category format must be a number')
]


module.exports = videoValidator;