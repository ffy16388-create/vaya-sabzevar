const express = require('express');
const db = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const { ValidationError, NotFoundError } = require('../../utils/errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM categories WHERE is_active = true ORDER BY order_index');
  res.json({ success: true, data: result.rows });
});

router.post('/', async (req, res) => {
  const { city_id, name_fa, name_en, slug, icon_url } = req.body;
  
  if (!city_id || !name_fa || !slug) {
    throw new ValidationError('Missing required fields');
  }

  const id = uuidv4();
  const result = await db.query(
    'INSERT INTO categories (id, city_id, name_fa, name_en, slug, icon_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, city_id, name_fa, name_en, slug, icon_url]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name_fa, name_en, icon_url, order_index } = req.body;
  
  const result = await db.query(
    'UPDATE categories SET name_fa = $1, name_en = $2, icon_url = $3, order_index = $4 WHERE id = $5 RETURNING *',
    [name_fa, name_en, icon_url, order_index, id]
  );

  res.json({ success: true, data: result.rows[0] });
});

router.delete('/:id', async (req, res) => {
  await db.query('UPDATE categories SET is_active = false WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
