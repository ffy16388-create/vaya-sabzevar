const express = require('express');
const searchController = require('../controllers/searchController');
const rateLimit = require('express-rate-limit');

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: 'Too many search requests'
});

const router = express.Router();

router.get('/', searchLimiter, searchController.search);
router.get('/advanced', searchLimiter, searchController.advancedSearch);

module.exports = router;
