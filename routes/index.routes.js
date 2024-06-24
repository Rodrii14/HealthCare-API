const express = require('express');
const router = express.Router();

const videoRoute = require('./video.routes');
const userRoute = require('./auth.routes')
const commentRoute = require('./comment.routes');

{/* http://localhost:3500/api/video */}
router.use('/video', videoRoute);

{/* http://localhost:3500/api/auth */}
router.use('/auth', userRoute);

{/* http://localhost:3500/api/community */}
router.use('/community', commentRoute);

module.exports = router;