const express = require('express');
const db = require('../config/database');
const { authenticate } = require('../middlewares/auth');
const { ValidationError } = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get user favorites
router.get('/', authenticate, async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const result = await db.query(
    `SELECT b.* FROM businesses b 
     INNER JOIN favorites f ON b.id = f.business_id
     WHERE f.user_id = $1 AND b.is_active = true AND b.deleted_at IS NULL
     ORDER BY f.created_at DESC
     LIMIT $2 OFFSET $3`,
    [req.user.id, limit, offset]
  );

  res.json({ success: true, data: result.rows });
});

// Add to favorites
router.post('/', authenticate, async (req, res) => {
  const { business_id } = req.body;
  
  if (!business_id) {
    throw new ValidationError('business_id is required');
  }

  const id = uuidv4();
  const result = await db.query(
    'INSERT INTO favorites (id, user_id, business_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *',
    [id, req.user.id, business_id]
  );

  res.status(201).json({ success: true, data: result.rows[0] || {} });
});

// Remove from favorites
router.delete('/:business_id', authenticate, async (req, res) => {
  await db.query(
    'DELETE FROM favorites WHERE user_id = $1 AND business_id = $2',
    [req.user.id, req.params.business_id]
  );

  res.json({ success: true });
});

module.exports = router;
