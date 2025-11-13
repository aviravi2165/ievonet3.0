/**
 * Migration: 001_initial_schema
 * Description: Create initial database schema with users, embeddings, files, and audit logs tables
 * Created: 2024
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/fullstack_db',
});

async function up() {
  const client = await pool.connect();
  try {
    console.log('Running migration: 001_initial_schema (up)');
    
    const schemaSql = fs.readFileSync(path.join(__dirname, '../schemas/schema.sql'), 'utf8');
    await client.query(schemaSql);
    
    console.log('✓ Migration 001_initial_schema completed successfully');
  } catch (error) {
    console.error('✗ Migration 001_initial_schema failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

async function down() {
  const client = await pool.connect();
  try {
    console.log('Reverting migration: 001_initial_schema (down)');
    
    await client.query(`
      DROP TABLE IF EXISTS audit_logs CASCADE;
      DROP TABLE IF EXISTS files CASCADE;
      DROP TABLE IF EXISTS embeddings CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP EXTENSION IF EXISTS vector CASCADE;
    `);
    
    console.log('✓ Migration 001_initial_schema reverted successfully');
  } catch (error) {
    console.error('✗ Revert failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { up, down };
