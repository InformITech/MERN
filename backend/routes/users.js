const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/userMiddleware');
const { verifyPayload } = require('../controllers/JWT');
const { userAuth } = require('../middlewares/Auth');

router.post('/register', middleware.register)
router.post('/login', middleware.login)
router.post('/verify', verifyPayload, userAuth)
router.post('/uploadImage', middleware.upload.single('image'), middleware.afterUpdate)
router.post('/updateProfile', middleware.changeProfile)
module.exports = router;
