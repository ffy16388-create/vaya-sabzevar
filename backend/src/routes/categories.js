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
    `SELECT c.id, c.name_fa, c.name_en, c.slug, c.icon_url, 
            COUNT(b.id) as business_count 
     FROM categories c 
     LEFT JOIN businesses b ON c.id = b.category_id AND b.is_active = true AND b.deleted_at IS NULL
     WHERE c.city_id = $1 AND c.is_active = true 
     GROUP BY c.id 
     ORDER BY c.order_index`,
    [city_id]
  );

  res.json({ success: true, data: result.rows });
});

router.get('/:id', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM categories WHERE id = $1 AND is_active = true',
    [req.params.id]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Category not found');
  }

  res.json({ success: true, data: result.rows[0] });
});

module.exports = router;
