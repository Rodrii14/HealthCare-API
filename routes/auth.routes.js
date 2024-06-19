const express = require('express');
const router = express.Router();

const { register } = require('../validators/auth.validators');
const validate = require('../validators/index.validators');
const userControllers = require('../controllers/auth.controllers');

{/* http://localhost:3500/api/auth/ */}
router.post('/', register, validate, userControllers.register);
router.post('/login/', userControllers.login)

module.exports = router;