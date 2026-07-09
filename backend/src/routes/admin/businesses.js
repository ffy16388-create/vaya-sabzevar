const express = require('express');
const db = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const { ValidationError, NotFoundError } = require('../../utils/errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit = 20, offset = 0, city_id, category_id, is_active } = req.query;
  
  let query = 'SELECT * FROM businesses WHERE deleted_at IS NULL';
  const params = [];
  let paramCount = 0;

  if (city_id) {
    query += ` AND city_id = $${++paramCount}`;
    params.push(city_id);
  }
  if (category_id) {
    query += ` AND category_id = $${++paramCount}`;
    params.push(category_id);
  }
  if (is_active !== undefined) {
    query += ` AND is_active = $${++paramCount}`;
    params.push(is_active === 'true');
  }

  query += ` ORDER BY created_at DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
  params.push(limit, offset);

  const result = await db.query(query, params);
  res.json({ success: true, data: result.rows });
});

router.post('/', async (req, res) => {
  const { city_id, category_id, district_id, name, description, phone, whatsapp, instagram, address, latitude, longitude, opening_time, closing_time } = req.body;
  
  if (!city_id || !category_id || !name) {
    throw new ValidationError('Missing required fields');
  }

  const id = uuidv4();
  const result = await db.query(
    `INSERT INTO businesses (id, city_id, category_id, district_id, name, description, phone, whatsapp, instagram, address, latitude, longitude, opening_time, closing_time, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
     RETURNING *`,
    [id, city_id, category_id, district_id, name, description, phone, whatsapp, instagram, address, latitude, longitude, opening_time, closing_time, req.user.id]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
});

router.get('/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM businesses WHERE id = $1', [req.params.id]);
  
  if (result.rows.length === 0) {
    throw new NotFoundError('Business not found');
  }

  res.json({ success: true, data: result.rows[0] });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const setClauses = [];
  const params = [];
  let paramCount = 0;

  Object.entries(updates).forEach(([key, value]) => {
    setClauses.push(`${key} = $${++paramCount}`);
    params.push(value);
  });

  params.push(id);
  
  const result = await db.query(
    `UPDATE businesses SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = $${++paramCount} RETURNING *`,
    params
  );

  res.json({ success: true, data: result.rows[0] });
});

router.delete('/:id', async (req, res) => {
  const result = await db.query(
    'UPDATE businesses SET deleted_at = NOW() WHERE id = $1 RETURNING *',
    [req.params.id]
  );

  res.json({ success: true, data: result.rows[0] });
});

module.exports = router;
