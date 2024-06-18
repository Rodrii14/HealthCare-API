const express = require('express');
const router = express.Router();

const videoRoute = require('./video.routes');

{/* http://localhost:3500/api/video */}
router.use('/video', videoRoute);

module.exports = router;