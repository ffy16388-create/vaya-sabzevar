const express = require('express');
const authRoutes = require('./auth');
const businessRoutes = require('./businesses');
const searchRoutes = require('./search');
const adminRoutes = require('./admin');
const categoriesRoutes = require('./categories');
const districtsRoutes = require('./districts');
const reviewRoutes = require('./reviews');
const favoriteRoutes = require('./favorites');

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/businesses', businessRoutes);
router.use('/categories', categoriesRoutes);
router.use('/districts', districtsRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favorites', favoriteRoutes);

// Protected admin routes
router.use('/admin', adminRoutes);

module.exports = router;
