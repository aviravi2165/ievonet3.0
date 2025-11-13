# Project Structure & File Listing

Complete overview of the Full-Stack Application project structure.

## 📦 Root Directory Files

```
.gitignore                 # Git ignore rules
package.json              # Root workspace configuration
README.md                 # Main project documentation
SETUP.md                  # Detailed setup instructions
QUICK_START.md            # Quick start guide
API.md                    # API documentation
PROJECT_STRUCTURE.md      # This file
```

## 🖥️ Backend Structure

```
backend/
├── .env                      # Environment variables (configured)
├── .env.example             # Environment template
├── .gitignore               # Git ignore for backend
├── package.json             # Backend dependencies
├── jest.config.js           # Jest testing configuration
│
├── src/
│   ├── index.js             # Express server entry point
│   │
│   ├── config/
│   │   └── database.js      # PostgreSQL pool configuration
│   │
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── errorHandler.js  # Global error handling
│   │
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   │
│   ├── models/
│   │   └── User.js          # User database model
│   │
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication endpoints
│   │   └── healthRoutes.js  # Health check endpoints
│   │
│   └── utils/
│       ├── logger.js        # Winston logging configuration
│       └── tokenUtils.js    # JWT token utilities
│
├── __tests__/
│   └── auth.test.js         # Jest test examples
│
├── logs/
│   └── .gitkeep             # Keeps directory in git
│
└── uploads/
    └── .gitkeep             # Keeps directory in git
```

### Backend Dependencies

**Runtime:**
- `express` - Web framework
- `pg` - PostgreSQL client
- `pgvector` - Vector database support
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT tokens
- `multer` - File uploads
- `winston` - Logging
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `express-validator` - Input validation

**Development:**
- `nodemon` - Development auto-reload
- `jest` - Testing framework
- `supertest` - API testing

## 🎨 Frontend Structure

```
frontend/
├── .env.example             # Frontend environment template
├── .gitignore               # Git ignore for frontend
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite build configuration
├── index.html               # HTML entry point
│
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main App component
    │
    ├── components/
    │   ├── Navigation.jsx    # Top navigation bar
    │   └── Footer.jsx        # Footer component
    │
    ├── pages/
    │   ├── Home.jsx          # Landing page
    │   ├── Demo.jsx          # Feature demonstration
    │   ├── Features.jsx      # Detailed features
    │   └── Login.jsx         # Authentication page
    │
    ├── hooks/
    │   └── useTheme.js       # Theme switcher hook
    │
    ├── utils/
    │   └── api.js            # Axios API client
    │
    └── styles/
        ├── theme.js          # Light & dark themes
        ├── GlobalStyles.js   # Global CSS-in-JS styles
        └── [Component-specific styling inline]
```

### Frontend Dependencies

**Runtime:**
- `react` - UI library
- `react-dom` - React DOM
- `react-router-dom` - Client routing
- `@mantine/core` - Component library
- `@mantine/hooks` - Mantine hooks
- `@emotion/react` - CSS-in-JS
- `@emotion/styled` - Styled components
- `axios` - HTTP client
- `dayjs` - Date handling

**Development:**
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite

## 🗄️ Database Structure

```
database/
├── README.md                # Database documentation
│
├── schemas/
│   └── schema.sql          # Complete database schema
│
├── migrations/
│   ├── migrate.js          # Migration runner
│   └── 001_initial_schema.js # Initial migration
│
└── seeds/
    └── seed_data.js        # Sample data seeding
```

### Database Schema

**Tables:**
- `users` - User accounts with bcrypt passwords
- `embeddings` - AI embeddings with pgvector
- `files` - File uploads metadata
- `audit_logs` - Activity logging

**Features:**
- PostgreSQL relational database
- pgvector for AI/ML embeddings
- JSONB fields for flexible data
- Foreign keys for referential integrity
- Indexes on frequently queried columns

## 📊 File Statistics

### Backend
- **Files:** 13 source files + 1 test file
- **Packages:** 14 dependencies + 3 dev dependencies
- **Size:** ~5KB of source code

### Frontend
- **Files:** 14 source files
- **Packages:** 9 dependencies + 2 dev dependencies
- **Size:** ~25KB of source code

### Database
- **Files:** 4 SQL/JS files
- **Tables:** 4 (users, embeddings, files, audit_logs)
- **Indexes:** 10+

### Documentation
- **Files:** 7 markdown files
- **Coverage:** Setup, API, Quick Start, Project Structure, Database, Main README

## 🎯 Component Hierarchy

```
App.jsx
├── Navigation.jsx (sticky header)
│   ├── Logo
│   ├── Navigation Links
│   ├── Theme Toggle (Light/Dark)
│   └── Mobile Menu
│
├── Main Routes
│   ├── Home (/)
│   │   ├── Hero Section
│   │   └── Features Grid
│   │
│   ├── Demo (/demo)
│   │   ├── Features Cards
│   │   └── API Endpoints
│   │
│   ├── Features (/features)
│   │   ├── Backend Features
│   │   ├── Frontend Features
│   │   ├── Database Features
│   │   ├── Security Features
│   │   └── Performance Features
│   │
│   └── Login (/login)
│       ├── Login Form
│       └── Register Form
│
└── Footer.jsx (sticky footer)
    ├── About Section
    ├── Tech Stack
    └── Social Links
```

## 🔗 API Routes

```
/api
├── /health (GET)            - Server health status
├── / (GET)                  - API info
│
└── /auth
    ├── /register (POST)     - User registration
    ├── /login (POST)        - User login
    └── /profile (GET)       - Get user profile (protected)
```

## 📱 Pages & Routes

| Route | Component | Features |
|-------|-----------|----------|
| `/` | Home.jsx | Landing, features, CTA |
| `/demo` | Demo.jsx | Feature showcase, API examples |
| `/features` | Features.jsx | Detailed features list |
| `/login` | Login.jsx | Auth form, registration |

## 🎨 Styling Architecture

### Theme System
- **Light Theme:** Primary #0066cc, BG #ffffff
- **Dark Theme:** Primary #0d6efd, BG #1e1e1e
- **Storage:** localStorage for persistence
- **Detection:** System preference on first visit

### Styled Components
- All styling uses Emotion CSS-in-JS
- No external CSS files
- Component-scoped styles
- Dynamic theme switching
- Mobile-first responsive design

## 🔐 Authentication Flow

```
1. User Registration
   └─ POST /api/auth/register
      ├─ Validate input
      ├─ Hash password with bcrypt
      ├─ Create user in database
      ├─ Generate JWT token
      └─ Return token + user data

2. User Login
   └─ POST /api/auth/login
      ├─ Verify credentials
      ├─ Generate JWT token
      └─ Return token + user data

3. Protected Routes
   └─ GET /api/auth/profile (requires token)
      ├─ Extract token from header
      ├─ Verify JWT signature
      ├─ Get user data
      └─ Return profile
```

## 📦 Build Outputs

### Backend
- Direct Node.js execution (no build needed)
- Files served as-is
- Optional: Can bundle with webpack/esbuild for production

### Frontend
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Output Files:**
  - `index.html` - Single page entry
  - `assets/` - JS/CSS bundles
  - Optimized and minified

## 🧪 Testing Structure

### Backend Tests
- Location: `backend/__tests__/`
- Framework: Jest
- Coverage: API endpoints, error handling
- Run: `npm test`

### Frontend Tests
- Ready for: React Testing Library / Vitest
- Ready to implement

## 🚀 Deployment Structure

### Backend Deployment
```
1. Install dependencies: npm install
2. Run migrations: node database/migrations/migrate.js up
3. Set environment variables
4. Start server: npm start
5. Server listens on configured PORT
```

### Frontend Deployment
```
1. Install dependencies: npm install
2. Build: npm run build
3. Deploy dist/ to static hosting
4. Configure API endpoint in .env
5. Serve from CDN or static server
```

### Database Deployment
```
1. Provision PostgreSQL instance
2. Create database
3. Enable pgvector extension
4. Run migrations
5. Seed initial data
6. Configure backups
```

## 📝 Configuration Files

### Root
- `package.json` - Workspace configuration

### Backend
- `.env` - Environment variables
- `.env.example` - Environment template
- `jest.config.js` - Test configuration
- `.gitignore` - Git ignore rules

### Frontend
- `vite.config.js` - Build configuration
- `.env.example` - Environment template
- `index.html` - HTML template
- `.gitignore` - Git ignore rules

### Database
- No config files (SQL-based)

## 🔄 Data Flow

```
Frontend (React)
    ↓
Axios API Client
    ↓
Express Server
    ↓
Controllers/Models
    ↓
PostgreSQL Database
    ↓
Response Back to Frontend
```

## 📊 Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2+ |
| Frontend Build | Vite | 5.0+ |
| Styling | Emotion | 11.11+ |
| Components | Mantine | 7.3+ |
| Backend | Node.js | 16+ |
| Backend Framework | Express | 4.18+ |
| Database | PostgreSQL | 13+ |
| Vector DB | pgvector | 0.1+ |
| Password Hashing | Bcrypt | 5.1+ |
| Authentication | JWT | via jsonwebtoken |
| File Uploads | Multer | 1.4+ |
| Logging | Winston | 3.11+ |
| HTTP Client | Axios | 1.6+ |
| Testing | Jest | 29.7+ |

## 🎯 Quick Navigation

- **Setup Guide:** [SETUP.md](./SETUP.md)
- **Quick Start:** [QUICK_START.md](./QUICK_START.md)
- **API Docs:** [API.md](./API.md)
- **Main README:** [README.md](./README.md)
- **Database Docs:** [database/README.md](./database/README.md)

---

**Project Version:** 1.0.0  
**Created:** 2024  
**Status:** ✅ Ready for Development
