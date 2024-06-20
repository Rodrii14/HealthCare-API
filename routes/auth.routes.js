const express = require('express');
const router = express.Router();

const { register } = require('../validators/auth.validators');
const validate = require('../validators/index.validators');
const userControllers = require('../controllers/auth.controllers');
const { auth } = require('../middlewares/auth.middlewares');

{/* http://localhost:3500/api/auth/ */}
router.post('/', register, validate, userControllers.register);
router.post('/login/', userControllers.login)

{/* http://localhost:3500/api/auth/data/ */}
router.patch('/data/', auth, userControllers.update);
router.get('/data/', auth, userControllers.getData);

module.exports = router;