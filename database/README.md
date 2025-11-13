# Database Management

This directory contains all database-related files including migrations, schemas, and seed data.

## Folder Structure

- **schemas/** - SQL schema files defining the database structure
- **migrations/** - Migration scripts for version control of database changes
- **seeds/** - Data seeding scripts for development and testing

## Database Setup

### Prerequisites

- PostgreSQL 13+
- pgvector extension enabled
- Node.js for running migration scripts

### Creating the Database

```bash
# Create database
createdb fullstack_db

# Enable pgvector extension
psql fullstack_db -c "CREATE EXTENSION vector;"
```

### Running Migrations

```bash
# From database/migrations directory
node migrate.js up          # Run all migrations
node migrate.js up 001      # Run specific migration
node migrate.js down        # Revert all migrations
node migrate.js down 001    # Revert specific migration
```

### Seeding Data

```bash
# From database/seeds directory
node seed_data.js
```

## Schema Overview

### Users Table
- `id` - Primary key
- `email` - Unique user email
- `password` - Bcrypt hashed password
- `name` - User name
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Embeddings Table (AI/pgvector)
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Embedding title
- `description` - Embedding description
- `embedding` - Vector embedding (1536 dimensions for compatibility with popular models)
- `metadata` - JSONB for additional data
- `created_at` - Creation timestamp

### Files Table (Multer)
- `id` - Primary key
- `user_id` - Foreign key to users
- `filename` - Stored filename
- `original_name` - Original filename
- `mimetype` - File MIME type
- `size` - File size in bytes
- `path` - File storage path
- `created_at` - Upload timestamp

### Audit Logs Table
- `id` - Primary key
- `user_id` - Foreign key to users (nullable)
- `action` - Action performed
- `resource_type` - Type of resource affected
- `resource_id` - ID of resource affected
- `details` - JSONB additional details
- `created_at` - Log timestamp

## Backup and Recovery

### Backing Up the Database

```bash
# Full database backup
pg_dump fullstack_db > backup.sql

# Compressed backup
pg_dump fullstack_db | gzip > backup.sql.gz
```

### Restoring from Backup

```bash
# From SQL file
psql fullstack_db < backup.sql

# From compressed file
gunzip -c backup.sql.gz | psql fullstack_db
```

## Performance Considerations

- Indexes are created on frequently queried columns (email, user_id, created_at)
- pgvector embeddings support similarity searches
- JSONB fields provide flexible metadata storage
- Foreign keys with CASCADE delete maintain referential integrity

## Environment Variables

Create a `.env` file in the backend directory with:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_db
DB_USER=postgres
DB_PASSWORD=password
```

## Common Tasks

### View All Users
```sql
SELECT id, email, name, created_at FROM users ORDER BY created_at DESC;
```

### View User Embeddings
```sql
SELECT id, title, embedding <-> query_vector AS distance FROM embeddings 
WHERE user_id = 1 
ORDER BY embedding <-> query_vector;
```

### Check File Uploads
```sql
SELECT u.name, f.original_name, f.size, f.created_at FROM files f
JOIN users u ON f.user_id = u.id
ORDER BY f.created_at DESC;
```

### View Audit Log
```sql
SELECT u.email, a.action, a.resource_type, a.created_at FROM audit_logs a
LEFT JOIN users u ON a.user_id = u.id
ORDER BY a.created_at DESC;
```
