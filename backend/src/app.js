const express = require('express');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Import routes
const denialRoutes = require('./routes/denialRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Force IPv4 lookup
dns.setDefaultResultOrder('ipv4first');

// Middleware
app.use(cors({
  origin: ['https://abner1986.github.io', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', denialRoutes);
app.use('/api/auth', authRoutes);

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;