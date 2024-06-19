const express = require('express');
const router = express.Router();

const { register } = require('../validators/user.validators');
const validate = require('../validators/index.validators');
const userControllers = require('../controllers/user.controllers');

{/* http://localhost:3500/api/auth/ */}
router.post('/', register, validate, userControllers.register);
router.post('/login/', userControllers.login)

module.exports = router;