# Full-Stack Application Setup Guide

This guide will help you get the full-stack application up and running on your machine.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Quick Start (5 minutes)

### Step 1: Install Dependencies

From the root directory:

```bash
# Install root-level dependencies (for monorepo management)
npm install

# This will automatically install backend and frontend dependencies due to workspaces
```

### Step 2: Setup Database

```bash
# Create the database
createdb fullstack_db

# Connect to the database and enable pgvector
psql fullstack_db -c "CREATE EXTENSION vector;"

# Run migrations from backend directory
cd database/migrations
node migrate.js up
cd ../..

# (Optional) Seed sample data
cd database/seeds
node seed_data.js
cd ../..
```

### Step 3: Configure Backend

```bash
cd backend

# The .env file is already configured with defaults
# For production, update these values:
# - JWT_SECRET
# - DATABASE_URL
# - CORS_ORIGIN

npm run dev
```

The backend API will start on `http://localhost:5000`

### Step 4: Run Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:3000`
- **API**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`

## Detailed Setup Instructions

### Database Setup

#### 1. Create PostgreSQL Database

```bash
# Using psql
psql -U postgres
postgres=# CREATE DATABASE fullstack_db;
postgres=# \c fullstack_db
postgres=# CREATE EXTENSION vector;
postgres=# \q

# Or using createdb (easier)
createdb -U postgres fullstack_db
psql -U postgres fullstack_db -c "CREATE EXTENSION vector;"
```

#### 2. Verify pgvector Installation

```bash
psql -U postgres fullstack_db
fullstack_db=# SELECT * FROM pg_extension WHERE extname = 'vector';
```

#### 3. Run Migrations

```bash
cd database/migrations

# Run all pending migrations
node migrate.js up

# Or run a specific migration
node migrate.js up 001
```

#### 4. Seed Sample Data

```bash
cd database/seeds

# Run seeding script
node seed_data.js
```

### Backend Setup

#### 1. Install Dependencies

```bash
cd backend
npm install
```

#### 2. Configure Environment Variables

The `.env` file is pre-configured. To customize:

```bash
# Edit backend/.env
DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d
PORT=5000
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

#### 3. Start Backend Server

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

**Expected output:**
```
Server running on port 5000
```

### Frontend Setup

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

#### 2. Start Development Server

```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

#### 3. Build for Production

```bash
cd frontend
npm run build

# Preview production build
npm run preview
```

## Available Pages

### Home (`/`)
- Landing page with featured services
- Quick start information
- Call-to-action buttons

### Demo (`/demo`)
- Feature showcase
- Available API endpoints
- Response examples

### Features (`/features`)
- Detailed feature breakdown
- Technology stack information
- Code examples

### Login (`/login`)
- User authentication interface
- Login form
- Registration form

## API Testing

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get user profile (requires token)
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:5000/api/auth/profile
```

### Using Postman

1. Import the API collection
2. Set variables:
   - `base_url` = `http://localhost:5000`
   - `token` = (set after login)
3. Test endpoints

## Running Both Services Together

From the root directory:

```bash
# Runs both backend and frontend in parallel
npm run dev

# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Watch mode for development
npm run test:watch

# With coverage
npm test -- --coverage
```

### Frontend Testing

Coming soon (setup needed for React Testing Library)

## Database Management

### Common Database Tasks

#### Backup Database

```bash
# Full backup
pg_dump fullstack_db > backup.sql

# Compressed backup
pg_dump fullstack_db | gzip > backup.sql.gz
```

#### Restore from Backup

```bash
# From SQL file
psql fullstack_db < backup.sql

# From compressed file
gunzip -c backup.sql.gz | psql fullstack_db
```

#### View Database Size

```bash
psql -U postgres fullstack_db -c "SELECT pg_size_pretty(pg_database_size('fullstack_db'));"
```

#### List All Tables

```bash
psql -U postgres fullstack_db -c "\dt"
```

#### View Users

```bash
psql -U postgres fullstack_db -c "SELECT id, email, name, created_at FROM users;"
```

## Troubleshooting

### PostgreSQL Connection Error

**Error**: `ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Windows
# Check Services panel
```

### pgvector Extension Not Found

**Error**: `extension "vector" does not exist`

**Solution**:
```bash
# Install pgvector
# macOS
brew install pgvector

# Ubuntu/Debian
sudo apt-get install postgresql-contrib

# Then enable in your database
psql -U postgres fullstack_db -c "CREATE EXTENSION vector;"
```

### Port Already in Use

**Error**: `EADDRINUSE :::5000` or `EADDRINUSE :::3000`

**Solution**:
```bash
# Find process using port
# Linux/macOS
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## Environment Variables

### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment |
| DATABASE_URL | postgresql://... | Database connection |
| JWT_SECRET | your_secret_key | JWT signing key |
| JWT_EXPIRE | 7d | Token expiration |
| CORS_ORIGIN | http://localhost:3000 | Frontend URL |
| LOG_LEVEL | debug | Logging level |

### Frontend (vite.config.js)

Proxy configuration for API calls is pre-configured to forward requests to `http://localhost:5000/api`

## Useful Commands

```bash
# Root level
npm run dev              # Start both services
npm run dev:backend     # Start backend only
npm run dev:frontend    # Start frontend only
npm run build           # Build both services
npm run build:backend   # Build backend
npm run build:frontend  # Build frontend
npm run test            # Run all tests
npm run test:backend    # Test backend
npm start:backend       # Start production backend

# Backend
cd backend
npm run dev             # Development server
npm start               # Production server
npm test                # Run tests
npm run test:watch     # Watch mode tests

# Frontend
cd frontend
npm run dev             # Development server
npm run build           # Production build
npm run preview         # Preview production build

# Database
cd database/migrations
node migrate.js up      # Run migrations
node migrate.js down    # Revert migrations

cd database/seeds
node seed_data.js       # Seed database
```

## Project Structure

```
fullstack-app/
├── backend/                    # Express API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── index.js          # Entry point
│   ├── __tests__/             # Test files
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── jest.config.js
│   └── package.json
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helper functions
│   │   ├── styles/            # Emotion styles & themes
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── .gitignore
│   └── package.json
│
├── database/                   # Database management
│   ├── schemas/               # SQL schema files
│   ├── migrations/            # Migration scripts
│   ├── seeds/                 # Seed data scripts
│   └── README.md
│
├── .gitignore
├── README.md
├── SETUP.md                   # This file
└── package.json              # Root package.json

```

## Next Steps

1. **Explore the API**: Visit `http://localhost:5000/api/health`
2. **Try the Demo Page**: Navigate to `http://localhost:3000/demo`
3. **Test Authentication**: Use the login page at `http://localhost:3000/login`
4. **Read the Code**: Check out the architecture in each folder
5. **Customize**: Modify features and add your own!

## Support & Resources

- **Backend Docs**: See `backend/README.md`
- **Frontend Docs**: See `frontend/README.md`
- **Database Docs**: See `database/README.md`
- **Main Docs**: See `README.md`

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Mantine Components](https://mantine.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgvector GitHub](https://github.com/pgvector/pgvector)

---

Happy coding! 🚀
