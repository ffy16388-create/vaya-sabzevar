const db = require('../config/database');

const search = async (req, res) => {
  const { q, limit = 20, offset = 0, city_id } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json({ success: true, data: [] });
  }

  let query = `
    SELECT id, name, category_id, rating, review_count, address, district_id, phone, whatsapp, instagram
    FROM businesses
    WHERE is_active = true AND deleted_at IS NULL
    AND (name ILIKE $1 OR description ILIKE $1)
  `;
  const params = [`%${q}%`];
  let paramCount = 1;

  if (city_id) {
    query += ` AND city_id = $${++paramCount}`;
    params.push(city_id);
  }

  query += ` ORDER BY rating DESC, review_count DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
  params.push(limit, offset);

  const result = await db.query(query, params);

  res.json({
    success: true,
    data: result.rows,
    query: q
  });
};

const advancedSearch = async (req, res) => {
  const { city_id, category_id, district_id, min_rating = 0, limit = 20, offset = 0 } = req.query;

  let query = 'SELECT * FROM businesses WHERE is_active = true AND deleted_at IS NULL AND rating >= $1';
  const params = [min_rating];
  let paramCount = 1;

  if (city_id) {
    query += ` AND city_id = $${++paramCount}`;
    params.push(city_id);
  }
  if (category_id) {
    query += ` AND category_id = $${++paramCount}`;
    params.push(category_id);
  }
  if (district_id) {
    query += ` AND district_id = $${++paramCount}`;
    params.push(district_id);
  }

  query += ` ORDER BY rating DESC, created_at DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
  params.push(limit, offset);

  const result = await db.query(query, params);
  const total = await db.query('SELECT COUNT(*) FROM businesses WHERE is_active = true AND deleted_at IS NULL AND rating >= $1', [min_rating]);

  res.json({
    success: true,
    data: result.rows,
    total: parseInt(total.rows[0].count),
    limit,
    offset
  });
};

module.exports = { search, advancedSearch };
