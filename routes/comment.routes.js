const express = require('express');
const router = express.Router();

const { create } = require('../validators/comment.validators');
const validate = require('../validators/index.validators');
const { auth } = require('../middlewares/auth.middlewares');
const commentController = require('../controllers/comment.controllers');

router.post('/', auth, create, validate, commentController.create);
router.get('/', auth, commentController.getAll);
router.delete('/', auth, commentController.delete);

module.exports = router;