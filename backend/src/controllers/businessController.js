const db = require('../config/database');
const { NotFoundError } = require('../utils/errors');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
  const { limit = 20, offset = 0, city_id, category_id, district_id, sort = 'created_at' } = req.query;
  
  let query = 'SELECT * FROM businesses WHERE is_active = true AND deleted_at IS NULL';
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
  if (district_id) {
    query += ` AND district_id = $${++paramCount}`;
    params.push(district_id);
  }

  query += ` ORDER BY ${sort} DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
  params.push(limit, offset);

  const result = await db.query(query, params);
  const total = await db.query('SELECT COUNT(*) FROM businesses WHERE is_active = true AND deleted_at IS NULL');

  res.json({
    success: true,
    data: result.rows,
    total: parseInt(total.rows[0].count),
    limit,
    offset
  });
};

const getOne = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM businesses WHERE id = $1 AND is_active = true',
    [req.params.id]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Business not found');
  }

  // Increment views
  await db.query('UPDATE businesses SET views_count = views_count + 1 WHERE id = $1', [req.params.id]);

  res.json({ success: true, data: result.rows[0] });
};

const getReviews = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  
  const result = await db.query(
    'SELECT * FROM reviews WHERE business_id = $1 AND is_active = true ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [req.params.id, limit, offset]
  );

  res.json({ success: true, data: result.rows });
};

const getImages = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM images WHERE business_id = $1 ORDER BY order_index, created_at',
    [req.params.id]
  );

  res.json({ success: true, data: result.rows });
};

const addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, title, content } = req.body;

  const reviewId = uuidv4();
  const result = await db.query(
    'INSERT INTO reviews (id, business_id, user_id, rating, title, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [reviewId, id, req.user.id, rating, title, content]
  );

  // Update business rating
  const ratingResult = await db.query(
    'SELECT AVG(rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE business_id = $1 AND is_active = true',
    [id]
  );

  await db.query(
    'UPDATE businesses SET rating = $1, review_count = $2 WHERE id = $3',
    [ratingResult.rows[0].avg_rating, ratingResult.rows[0].review_count, id]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
};

module.exports = { getAll, getOne, getReviews, getImages, addReview };
