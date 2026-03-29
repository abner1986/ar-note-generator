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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.get('/api/all-denial-codes-test', (req, res) => {
  res.json({ message: 'Test route works' });
});

app.use(errorHandler);

module.exports = app;