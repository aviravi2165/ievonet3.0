#!/usr/bin/env node

/**
 * Migration Runner
 * Usage: node migrate.js [up|down] [migration_number]
 * Example: node migrate.js up 001
 */

require('dotenv').config({ path: '../../backend/.env' });
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'up';
const migrationNum = args[1];

async function runMigration() {
  try {
    const migrationsDir = __dirname;
    
    if (migrationNum) {
      // Run specific migration
      const migrationFile = path.join(migrationsDir, `${migrationNum}_*.js`);
      const files = fs.readdirSync(migrationsDir).filter(f => f.startsWith(migrationNum));
      
      if (files.length === 0) {
        throw new Error(`Migration ${migrationNum} not found`);
      }

      const migration = require(path.join(migrationsDir, files[0]));
      if (command === 'up' && migration.up) {
        await migration.up();
      } else if (command === 'down' && migration.down) {
        await migration.down();
      }
    } else {
      // Run all migrations in order
      const files = fs.readdirSync(migrationsDir)
        .filter(f => f.match(/^\d+_.*\.js$/) && !f.includes('migrate'))
        .sort();

      for (const file of files) {
        const migration = require(path.join(migrationsDir, file));
        if (command === 'up' && migration.up) {
          await migration.up();
        } else if (command === 'down' && migration.down) {
          await migration.down();
        }
      }
    }

    console.log(`\n✅ Migration ${command} completed`);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration error:', error.message);
    process.exit(1);
  }
}

runMigration();
