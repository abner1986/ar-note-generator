// backend/src/controllers/denialController.js

const pool = require('../config/database');

exports.test = (req, res) => {
  res.json({ message: 'Server is running!' });
};

exports.testDb = async (req, res) => {
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
    res.status(500).json({ connected: false, error: err.message });
  }
};

exports.getAllDenialCodes = async (req, res) => {
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
};

exports.getDenialByCode = async (req, res) => {
  const { code } = req.params;
  console.log('🔍 Searching for code:', code);
  try {
    // Try CARC
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
    if (carcResult.rows.length) return res.json(carcResult.rows[0]);

    // Try RARC
    const rarcResult = await pool.query(
      `SELECT code, description, resolution,
        is_callable, priority, quick_reason, code_family,
        'RARC' as code_type,
        NULL as category_name, 'generic' as workflow_type, NULL as typical_actions
       FROM rarc_codes WHERE code = $1`,
      [code]
    );
    if (rarcResult.rows.length) return res.json(rarcResult.rows[0]);

    // Try OTHER
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
    if (otherResult.rows.length) return res.json(otherResult.rows[0]);

    res.status(404).json({ error: 'Code not found' });
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.searchCodes = async (req, res) => {
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
               is_callable, priority, quick_reason, code_family,
               NULL as category_name, NULL as workflow_type, NULL as typical_actions
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
               is_callable, priority, quick_reason, code_family,
               NULL as category_name, NULL as workflow_type, NULL as typical_actions
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
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, category_name, workflow_type, typical_actions FROM denial_categories ORDER BY category_name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching categories:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.health = (req, res) => {
  res.json({
    status: 'OK',
    time: new Date().toISOString(),
    database: pool.totalCount ? 'Connected' : 'Checking',
    uptime: process.uptime()
  });
};