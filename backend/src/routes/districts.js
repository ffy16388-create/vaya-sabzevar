const express = require('express');
const db = require('../config/database');
const { ValidationError, NotFoundError } = require('../utils/errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const { city_id } = req.query;
  
  if (!city_id) {
    throw new ValidationError('city_id is required');
  }

  const result = await db.query(
    `SELECT d.id, d.name_fa, d.name_en, d.slug, d.latitude, d.longitude,
            COUNT(b.id) as business_count
     FROM districts d
     LEFT JOIN businesses b ON d.id = b.district_id AND b.is_active = true AND b.deleted_at IS NULL
     WHERE d.city_id = $1 AND d.is_active = true
     GROUP BY d.id
     ORDER BY d.name_fa`,
    [city_id]
  );

  res.json({ success: true, data: result.rows });
});

router.get('/:id', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM districts WHERE id = $1 AND is_active = true',
    [req.params.id]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('District not found');
  }

  res.json({ success: true, data: result.rows[0] });
});

module.exports = router;
