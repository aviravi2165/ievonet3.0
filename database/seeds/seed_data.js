/**
 * Database Seeding Script
 * Description: Seeds initial data for development
 */

require('dotenv').config({ path: '../../backend/.env' });
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/fullstack_db',
});

async function seedData() {
  const client = await pool.connect();
  try {
    console.log('🌱 Seeding database...');

    // Hash passwords
    const password1 = await bcrypt.hash('password123', 10);
    const password2 = await bcrypt.hash('password456', 10);

    // Seed users
    console.log('Seeding users...');
    const usersResult = await client.query(`
      INSERT INTO users (email, password, name, created_at)
      VALUES 
        ('john@example.com', $1, 'John Doe', NOW()),
        ('jane@example.com', $2, 'Jane Smith', NOW())
      RETURNING id, email, name
    `, [password1, password2]);

    console.log('✓ Users seeded:', usersResult.rows.map(u => u.email).join(', '));

    const userId1 = usersResult.rows[0].id;
    const userId2 = usersResult.rows[1].id;

    // Seed embeddings (AI vectors)
    console.log('Seeding embeddings...');
    const embeddingsResult = await client.query(`
      INSERT INTO embeddings (user_id, title, description, embedding, metadata, created_at)
      VALUES 
        ($1, 'Product Overview', 'Main product embedding', '[0.1, 0.2, 0.3, 0.4, 0.5]'::vector(5), '{"category": "product", "version": 1}'::jsonb, NOW()),
        ($2, 'Feature Set', 'Feature vector embedding', '[0.5, 0.4, 0.3, 0.2, 0.1]'::vector(5), '{"category": "features", "version": 1}'::jsonb, NOW())
      RETURNING id, title
    `, [userId1, userId2]);

    console.log('✓ Embeddings seeded:', embeddingsResult.rowCount, 'records');

    // Seed audit logs
    console.log('Seeding audit logs...');
    const auditResult = await client.query(`
      INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, created_at)
      VALUES 
        ($1, 'USER_REGISTERED', 'users', $1, '{"email": "john@example.com"}'::jsonb, NOW()),
        ($2, 'USER_REGISTERED', 'users', $2, '{"email": "jane@example.com"}'::jsonb, NOW()),
        ($1, 'EMBEDDING_CREATED', 'embeddings', 1, '{"title": "Product Overview"}'::jsonb, NOW())
      RETURNING id, action
    `, [userId1, userId2]);

    console.log('✓ Audit logs seeded:', auditResult.rowCount, 'records');

    console.log('\n✅ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedData().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
