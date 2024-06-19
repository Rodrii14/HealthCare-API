const express = require('express');
const router = express.Router();

const videoRoute = require('./video.routes');
const userRoute = require('./auth.routes')

{/* http://localhost:3500/api/video */}
router.use('/video', videoRoute);

{/* http://localhost:3500/api/auth */}
router.use('/auth', userRoute);

module.exports = router;