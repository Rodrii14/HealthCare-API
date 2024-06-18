const express = require('express');
const router = express.Router();

const { create, category, id } = require('../validators/video.validators');
const validate = require('../validators/index.validators');
const videoControllers = require('../controllers/video.controllers');

{/* http://localhost:3500/api/video/ */}
router.post('/', create, validate, videoControllers.create);
router.get('/', videoControllers.getAll);

{/* http://localhost:3500/api/video/category/:category */}
router.get('/category/:category', category, validate, videoControllers.getAllByCategory);

{/* http://localhost:3500/api/video/id/:id */}
router.get('/id/:id', id, validate, videoControllers.getById);

module.exports = router;