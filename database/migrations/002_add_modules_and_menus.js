/**
 * Migration: 002_add_modules_and_menus
 * Description: Add modules and menu items tables for application menu system
 * Created: 2024
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/fullstack_db',
});

async function up() {
  const client = await pool.connect();
  try {
    console.log('Running migration: 002_add_modules_and_menus (up)');
    
    // Create modules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        label VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create menu items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        module_id INT REFERENCES modules(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        label VARCHAR(255) NOT NULL,
        path VARCHAR(255),
        icon VARCHAR(100),
        order_index INT DEFAULT 0,
        parent_id INT REFERENCES menu_items(id) ON DELETE CASCADE,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(module_id, name)
      );
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_modules_is_active ON modules(is_active);
      CREATE INDEX IF NOT EXISTS idx_modules_order_index ON modules(order_index);
      CREATE INDEX IF NOT EXISTS idx_menu_items_module_id ON menu_items(module_id);
      CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON menu_items(parent_id);
      CREATE INDEX IF NOT EXISTS idx_menu_items_is_active ON menu_items(is_active);
    `);

    // Insert default modules
    await client.query(`
      INSERT INTO modules (name, label, description, icon, order_index)
      VALUES 
        ('dashboard', 'Dashboard', 'Main dashboard', 'dashboard', 1),
        ('users', 'Users', 'User management', 'users', 2),
        ('settings', 'Settings', 'Application settings', 'settings', 3),
        ('reports', 'Reports', 'Analytics and reports', 'chart-bar', 4)
      ON CONFLICT (name) DO NOTHING;
    `);

    // Insert default menu items
    await client.query(`
      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'overview', 'Overview', '/dashboard/overview', 'home', 1 FROM modules WHERE name = 'dashboard'
      ON CONFLICT DO NOTHING;

      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'analytics', 'Analytics', '/dashboard/analytics', 'chart', 2 FROM modules WHERE name = 'dashboard'
      ON CONFLICT DO NOTHING;

      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'list', 'User List', '/users/list', 'list', 1 FROM modules WHERE name = 'users'
      ON CONFLICT DO NOTHING;

      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'roles', 'Roles', '/users/roles', 'lock', 2 FROM modules WHERE name = 'users'
      ON CONFLICT DO NOTHING;

      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'general', 'General', '/settings/general', 'cog', 1 FROM modules WHERE name = 'settings'
      ON CONFLICT DO NOTHING;

      INSERT INTO menu_items (module_id, name, label, path, icon, order_index)
      SELECT id, 'security', 'Security', '/settings/security', 'shield', 2 FROM modules WHERE name = 'settings'
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('✓ Migration 002_add_modules_and_menus completed successfully');
  } catch (error) {
    console.error('✗ Migration 002_add_modules_and_menus failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

async function down() {
  const client = await pool.connect();
  try {
    console.log('Reverting migration: 002_add_modules_and_menus (down)');
    
    await client.query(`
      DROP TABLE IF EXISTS menu_items CASCADE;
      DROP TABLE IF EXISTS modules CASCADE;
    `);
    
    console.log('✓ Migration 002_add_modules_and_menus reverted successfully');
  } catch (error) {
    console.error('✗ Revert failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { up, down };
