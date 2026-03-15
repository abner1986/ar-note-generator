const { Pool } = require('pg');
require('dotenv').config();

console.log('🔍 Testing database connection...');
console.log('📦 DATABASE_URL:', process.env.DATABASE_URL ? 'Found ✓' : 'Not Found ✗');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('⏳ Connecting to database...');
    const timeResult = await pool.query('SELECT NOW()');
    console.log('✅ Connected! Server time:', timeResult.rows[0].now);

    // Test 2: Check if tables exist
    console.log('⏳ Checking tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (tables.rows.length > 0) {
      console.log('✅ Tables found:', tables.rows.map(t => t.table_name).join(', '));
    } else {
      console.log('⚠️ No tables found in public schema');
    }

    // Test 3: Check carc_codes
    try {
      const carcCount = await pool.query('SELECT COUNT(*) FROM carc_codes');
      console.log('✅ carc_codes table exists with', carcCount.rows[0].count, 'records');
    } catch (err) {
      console.log('❌ carc_codes table error:', err.message);
    }

    // Test 4: Check rarc_codes
    try {
      const rarcCount = await pool.query('SELECT COUNT(*) FROM rarc_codes');
      console.log('✅ rarc_codes table exists with', rarcCount.rows[0].count, 'records');
    } catch (err) {
      console.log('❌ rarc_codes table error:', err.message);
    }

    console.log('🎉 All tests completed!');
    
  } catch (err) {
    console.error('❌ Connection failed!');
    console.error('Error details:', err.message);
    console.error('\n🔧 Possible fixes:');
    console.error('1. Check if your database server is running');
    console.error('2. Verify your DATABASE_URL in .env file');
    console.error('3. Check if your IP is allowed in Neon firewall settings');
    console.error('4. Try removing channel_binding=require from URL');
  } finally {
    await pool.end();
  }
}

testConnection();