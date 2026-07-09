const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.refreshToken);
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
