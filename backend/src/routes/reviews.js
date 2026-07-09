const express = require('express');
const db = require('../config/database');
const { authenticate } = require('../middlewares/auth');
const { ValidationError } = require('../utils/errors');

const router = express.Router();

router.get('/', async (req, res) => {
  const { business_id, limit = 10, offset = 0 } = req.query;
  
  if (!business_id) {
    throw new ValidationError('business_id is required');
  }

  const result = await db.query(
    'SELECT * FROM reviews WHERE business_id = $1 AND is_active = true ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [business_id, limit, offset]
  );

  res.json({ success: true, data: result.rows });
});

router.post('/', authenticate, async (req, res) => {
  const { business_id, rating, title, content } = req.body;
  
  if (!business_id || !rating || !title) {
    throw new ValidationError('Missing required fields');
  }

  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();

  const result = await db.query(
    'INSERT INTO reviews (id, business_id, user_id, rating, title, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, business_id, req.user.id, rating, title, content]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
});

module.exports = router;
