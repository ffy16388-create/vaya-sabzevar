const express = require('express');
const businessController = require('../controllers/businessController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/', businessController.getAll);
router.get('/:id', businessController.getOne);
router.get('/:id/reviews', businessController.getReviews);
router.get('/:id/images', businessController.getImages);
router.post('/:id/reviews', authenticate, businessController.addReview);

module.exports = router;
