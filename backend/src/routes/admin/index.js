const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth');
const businessRoutes = require('./businesses');
const categoryRoutes = require('./categories');
const districtRoutes = require('./districts');
const logsRoutes = require('./logs');
const db = require('../../config/database');

const router = express.Router();

// Protect all admin routes
router.use(authenticate);
router.use(authorize('admin'));

router.use('/businesses', businessRoutes);
router.use('/categories', categoryRoutes);
router.use('/districts', districtRoutes);
router.use('/logs', logsRoutes);

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  const stats = await Promise.all([
    db.query('SELECT COUNT(*) as count FROM businesses WHERE deleted_at IS NULL'),
    db.query('SELECT COUNT(*) as count FROM businesses WHERE is_active = true AND deleted_at IS NULL'),
    db.query('SELECT COUNT(*) as count FROM businesses WHERE is_featured = true AND featured_until > NOW()'),
    db.query('SELECT COUNT(*) as count FROM reviews'),
    db.query('SELECT AVG(rating) as avg_rating FROM businesses WHERE rating > 0')
  ]);

  res.json({
    success: true,
    data: {
      total_businesses: parseInt(stats[0].rows[0].count),
      active_businesses: parseInt(stats[1].rows[0].count),
      featured_businesses: parseInt(stats[2].rows[0].count),
      total_reviews: parseInt(stats[3].rows[0].count),
      avg_rating: parseFloat(stats[4].rows[0].avg_rating || 0).toFixed(2)
    }
  });
});

module.exports = router;
