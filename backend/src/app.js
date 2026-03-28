const express = require('express');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

const denialRoutes = require('./routes/denialRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

dns.setDefaultResultOrder('ipv4first');

app.use(cors({
  origin: ['https://abner1986.github.io', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api', denialRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

module.exports = app;