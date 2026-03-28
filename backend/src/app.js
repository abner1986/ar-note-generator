const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dns = require('dns');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['https://abner1986.github.io', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Force IPv4 lookup to avoid DNS issues
dns.setDefaultResultOrder('ipv4first');

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env file');
  console.error('📝 Please add your Neon database connection string to .env');
  process.exit(1);
}

console.log('📦 Connecting to database...');
console.log('🔍 Database host:', process.env.DATABASE_URL.split('@')[1]?.split('/')[0]);

// Create connection pool with timeout and retry settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Test database connection with retry logic
const connectWithRetry = (retries = 3) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('❌ Database connection error:', err.message);
      if (err.message.includes('ENOTFOUND')) {
        console.error('\n🔧 DNS RESOLUTION ERROR - FIXES:');
        console.error('1. Try using direct connection (remove -pooler from hostname)');
        console.error('   Current: ' + process.env.DATABASE_URL.split('@')[1]?.split('/')[0]);
        console.error('   Try: ep-rough-cloud-a1anfm28.ap-southeast-1.aws.neon.tech');
        console.error('\n2. Add to Windows hosts file (run as admin):');
        console.error('   Notepad C:\\Windows\\System32\\drivers\\etc\\hosts');
        console.error('   Add:  [IP_ADDRESS] ' + process.env.DATABASE_URL.split('@')[1]?.split('/')[0]);
        console.error('\n3. Check network connection:');
        console.error('   Run: nslookup ' + process.env.DATABASE_URL.split('@')[1]?.split('/')[0]);
        console.error('   Run: ping ' + process.env.DATABASE_URL.split('@')[1]?.split('/')[0]);
        console.error('\n4. Try using a different network (mobile hotspot)');
        console.error('5. Check if firewall is blocking port 5432');
      } else if (err.message.includes('timeout')) {
        console.error('⏰ Connection timeout - server might be slow or unreachable');
      } else if (err.message.includes('ECONNREFUSED')) {
        console.error('🚫 Connection refused - database server might be down');
      } else if (err.message.includes('password')) {
        console.error('🔑 Password error - check your credentials in .env');
      }
      if (retries > 0) {
        console.log(`\n🔄 Retrying connection... (${retries} attempts left)`);
        setTimeout(() => connectWithRetry(retries - 1), 3000);
      } else {
        console.error('\n❌ All connection attempts failed. Please fix the issue and restart.');
        process.exit(1);
      }
    } else {
      console.log('✅ Database connected successfully');
      release();
    }
  });
};
connectWithRetry(3);

// ==================== Public Endpoints ====================
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'Configured' : 'Missing'
  });
});

app.get('/api/test/db', async (req, res) => {
  try {
    const timeResult = await pool.query('SELECT NOW() as time');
    const carcCount = await pool.query('SELECT COUNT(*) FROM carc_codes');
    const rarcCount = await pool.query('SELECT COUNT(*) FROM rarc_codes');
    const otherCount = await pool.query('SELECT COUNT(*) FROM other_denial_codes');
    const catCount = await pool.query('SELECT COUNT(*) FROM denial_categories');
    res.json({
      connected: true,
      time: timeResult.rows[0].time,
      counts: {
        carc: carcCount.rows[0].count,
        rarc: rarcCount.rows[0].count,
        other: otherCount.rows[0].count,
        categories: catCount.rows[0].count
      },
      message: 'Database connection successful!'
    });
  } catch (err) {
    console.error('❌ Database test error:', err.message);
    res.status(500).json({ 
      connected: false, 
      error: err.message,
      message: 'Database connection failed'
    });
  }
});

// ==================== Authentication Endpoints ====================
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const SALT_ROUNDS = 10;

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password required' });
  }
  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hash]
    );
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const result = await pool.query(
      'SELECT id, username, email, password_hash FROM users WHERE username = $1',
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== Authentication Middleware ====================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ==================== Protected Endpoints ====================
// Get all denial codes (requires authentication)
app.get('/api/all-denial-codes', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT code, description, code_type, is_callable, priority, quick_reason, code_family
      FROM (
        SELECT code, description, 'CARC' as code_type, is_callable, priority, quick_reason, code_family FROM carc_codes
        UNION ALL
        SELECT code, description, 'RARC' as code_type, is_callable, priority, quick_reason, code_family FROM rarc_codes
        UNION ALL
        SELECT code, description, 'OTHER' as code_type, is_callable, priority, quick_reason, code_family FROM other_denial_codes
      ) AS all_codes
      ORDER BY code_type, code
      LIMIT 1000
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching all codes:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get denial details by code (public – you can also protect later)
app.get('/api/denial/:code', async (req, res) => {
  try {
    const { code } = req.params;
    console.log('🔍 Searching for code:', code);
    
    // Try CARC first with category join
    const carcResult = await pool.query(
      `SELECT 
        c.code, c.description, c.resolution,
        c.is_callable, c.priority, c.quick_reason, c.code_family,
        cat.category_name, cat.workflow_type, cat.typical_actions,
        'CARC' as code_type
       FROM carc_codes c
       LEFT JOIN denial_categories cat ON c.category_id = cat.id
       WHERE c.code = $1`,
      [code]
    );
    if (carcResult.rows.length > 0) {
      console.log('✅ Found in CARC:', carcResult.rows[0].code);
      return res.json(carcResult.rows[0]);
    }
    
    // Try RARC
    const rarcResult = await pool.query(
      `SELECT code, description, resolution,
        is_callable, priority, quick_reason, code_family,
        'RARC' as code_type,
        NULL as category_name, 'generic' as workflow_type, NULL as typical_actions
       FROM rarc_codes WHERE code = $1`,
      [code]
    );
    if (rarcResult.rows.length > 0) {
      console.log('✅ Found in RARC:', rarcResult.rows[0].code);
      return res.json(rarcResult.rows[0]);
    }
    
    // Try OTHER denial codes (PR, OA, PI, N, M, PAYER)
    const otherResult = await pool.query(
      `SELECT o.code, o.description, o.resolution,
        o.is_callable, o.priority, o.quick_reason, o.code_family,
        'OTHER' as code_type,
        cat.category_name, cat.workflow_type, cat.typical_actions
       FROM other_denial_codes o
       LEFT JOIN denial_categories cat ON o.category_id = cat.id
       WHERE o.code = $1`,
      [code]
    );
    if (otherResult.rows.length > 0) {
      console.log('✅ Found in OTHER:', otherResult.rows[0].code);
      return res.json(otherResult.rows[0]);
    }
    
    console.log('❌ Code not found:', code);
    res.status(404).json({ error: 'Code not found' });
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search codes (public – you can protect if desired)
app.get('/api/search', async (req, res) => {
  const { q, type } = req.query;
  console.log(`🔍 Searching for: ${q} in ${type || 'all'} codes`);
  
  try {
    let query;
    let params = [`%${q}%`];
    if (type === 'carc') {
      query = `
        SELECT code, description, resolution, 'CARC' as code_type,
               is_callable, priority, quick_reason, code_family,
               cat.category_name, cat.workflow_type, cat.typical_actions
        FROM carc_codes c
        LEFT JOIN denial_categories cat ON c.category_id = cat.id
        WHERE c.code ILIKE $1 OR c.description ILIKE $1
        ORDER BY CASE WHEN c.code ILIKE $2 THEN 1 ELSE 2 END, c.code
        LIMIT 50
      `;
      params.push(`${q}%`);
    } else if (type === 'rarc') {
      query = `
        SELECT code, description, resolution, 'RARC' as code_type,
               is_callable, priority, quick_reason, code_family
        FROM rarc_codes
        WHERE code ILIKE $1 OR description ILIKE $1
        ORDER BY CASE WHEN code ILIKE $2 THEN 1 ELSE 2 END, code
        LIMIT 50
      `;
      params.push(`${q}%`);
    } else if (type === 'other') {
      query = `
        SELECT code, description, resolution, 'OTHER' as code_type,
               is_callable, priority, quick_reason, code_family,
               cat.category_name, cat.workflow_type, cat.typical_actions
        FROM other_denial_codes o
        LEFT JOIN denial_categories cat ON o.category_id = cat.id
        WHERE o.code ILIKE $1 OR o.description ILIKE $1
        ORDER BY CASE WHEN o.code ILIKE $2 THEN 1 ELSE 2 END, o.code
        LIMIT 50
      `;
      params.push(`${q}%`);
    } else {
      query = `
        SELECT code, description, resolution, 'CARC' as code_type,
               is_callable, priority, quick_reason, code_family,
               cat.category_name, cat.workflow_type, cat.typical_actions
        FROM carc_codes c
        LEFT JOIN denial_categories cat ON c.category_id = cat.id
        WHERE c.code ILIKE $1 OR c.description ILIKE $1
        UNION ALL
        SELECT code, description, resolution, 'RARC' as code_type,
               is_callable, priority, quick_reason, code_family
        FROM rarc_codes
        WHERE code ILIKE $1 OR description ILIKE $1
        UNION ALL
        SELECT code, description, resolution, 'OTHER' as code_type,
               is_callable, priority, quick_reason, code_family,
               cat.category_name, cat.workflow_type, cat.typical_actions
        FROM other_denial_codes o
        LEFT JOIN denial_categories cat ON o.category_id = cat.id
        WHERE o.code ILIKE $1 OR o.description ILIKE $1
        ORDER BY code_type, code
        LIMIT 50
      `;
    }
    const result = await pool.query(query, params);
    console.log(`✅ Found ${result.rows.length} results`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all categories (public)
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, category_name, workflow_type, typical_actions FROM denial_categories ORDER BY category_name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching categories:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint (public)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    time: new Date().toISOString(),
    database: pool.totalCount ? 'Connected' : 'Checking',
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Try these endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test/db`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err.message);
});