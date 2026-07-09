const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { ValidationError, AuthenticationError, ConflictError } = require('../utils/errors');

const generateTokens = (userId, role) => {
  const access = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
  return { access };
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email and password required');
  }

  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    throw new AuthenticationError('Invalid credentials');
  }

  if (!user.is_active) {
    throw new AuthenticationError('Account disabled');
  }

  const { access } = generateTokens(user.id, user.role);

  res.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, role: user.role },
      token: access
    }
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email and password required');
  }

  const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const result = await db.query(
    'INSERT INTO users (id, email, password_hash, role, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role',
    [id, email, hashedPassword, 'user', true]
  );

  const user = result.rows[0];
  const { access } = generateTokens(user.id, user.role);

  res.status(201).json({
    success: true,
    data: {
      user,
      token: access
    }
  });
};

const refreshToken = async (req, res) => {
  throw new Error('Implement refresh token logic');
};

const getMe = async (req, res) => {
  const result = await db.query('SELECT id, email, role FROM users WHERE id = $1', [req.user.id]);
  res.json({ success: true, data: result.rows[0] });
};

const logout = async (req, res) => {
  res.json({ success: true });
};

module.exports = { login, register, refreshToken, getMe, logout };
