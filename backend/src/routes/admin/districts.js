const express = require('express');
const db = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const { ValidationError } = require('../../utils/errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM districts WHERE is_active = true ORDER BY name_fa');
  res.json({ success: true, data: result.rows });
});

router.post('/', async (req, res) => {
  const { city_id, name_fa, name_en, slug, latitude, longitude } = req.body;
  
  if (!city_id || !name_fa || !slug) {
    throw new ValidationError('Missing required fields');
  }

  const id = uuidv4();
  const result = await db.query(
    'INSERT INTO districts (id, city_id, name_fa, name_en, slug, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id, city_id, name_fa, name_en, slug, latitude, longitude]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name_fa, name_en, latitude, longitude } = req.body;
  
  const result = await db.query(
    'UPDATE districts SET name_fa = $1, name_en = $2, latitude = $3, longitude = $4 WHERE id = $5 RETURNING *',
    [name_fa, name_en, latitude, longitude, id]
  );

  res.json({ success: true, data: result.rows[0] });
});

router.delete('/:id', async (req, res) => {
  await db.query('UPDATE districts SET is_active = false WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
