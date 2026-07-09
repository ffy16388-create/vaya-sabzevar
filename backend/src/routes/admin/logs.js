const express = require('express');
const db = require('../../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit = 50, offset = 0, action, resource_type } = req.query;
  
  let query = 'SELECT * FROM admin_logs WHERE 1=1';
  const params = [];
  let paramCount = 0;

  if (action) {
    query += ` AND action = $${++paramCount}`;
    params.push(action);
  }
  if (resource_type) {
    query += ` AND resource_type = $${++paramCount}`;
    params.push(resource_type);
  }

  query += ` ORDER BY created_at DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
  params.push(limit, offset);

  const result = await db.query(query, params);
  res.json({ success: true, data: result.rows });
});

module.exports = router;
