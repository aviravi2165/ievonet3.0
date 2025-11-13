# Full-Stack Application

A modern, full-featured full-stack application built with Node.js, Express, React, and PostgreSQL with pgvector for AI capabilities.

## 🏗️ Project Structure

```
.
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.js     # Express server
│   ├── .env.example     # Environment variables template
│   └── package.json
│
├── frontend/            # React + Mantine frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Utility functions
│   │   ├── styles/      # Emotion styling
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration
│   └── package.json
│
└── database/            # Database management
    ├── schemas/         # SQL schema files
    ├── migrations/      # Database migrations
    ├── seeds/           # Data seeding scripts
    └── README.md        # Database documentation
```

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pgvector** - Vector extension for AI/ML
- **Bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **Multer** - File uploads
- **Winston** - Logging
- **Jest** - Testing framework

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Mantine** - Component library
- **Emotion** - CSS-in-JS styling
- **Axios** - HTTP client
- **Dayjs** - Date manipulation
- **Vite** - Build tool

### Database
- **PostgreSQL 13+** - Database
- **pgvector** - Vector embeddings
- **Migration scripts** - Schema versioning

## 📦 Installation

### Prerequisites
- Node.js 16+
- PostgreSQL 13+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fullstack-app
```

### 2. Setup Database

```bash
# Create database
createdb fullstack_db

# Enable pgvector extension
psql fullstack_db -c "CREATE EXTENSION vector;"

# Run migrations
cd database/migrations
node migrate.js up
cd ../..

# Seed data (optional)
cd database/seeds
node seed_data.js
cd ../..
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db

# Start server
npm run dev
```

Server runs on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (requires auth)

### Health
- `GET /api/health` - Check server health
- `GET /api` - API info

## 🎨 Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Protected routes with middleware
- ✅ CORS enabled

### Database
- ✅ PostgreSQL with pgvector
- ✅ Database migrations
- ✅ Data seeding
- ✅ Audit logging

### Frontend
- ✅ Light/Dark theme support
- ✅ Responsive design
- ✅ Modern UI with Mantine components
- ✅ Emotion styled components

### Backend
- ✅ RESTful API
- ✅ Error handling
- ✅ Winston logging
- ✅ File uploads with Multer

## 📝 Development

### Running Both Services
```bash
npm run dev
```

### Running Services Separately
```bash
npm run dev:backend
npm run dev:frontend
```

### Testing Backend
```bash
cd backend
npm test
```

### Building Frontend
```bash
cd frontend
npm run build
```

## 🗄️ Database Management

See [database/README.md](./database/README.md) for detailed database documentation including:
- Schema overview
- Migration instructions
- Backup and recovery procedures
- Common SQL queries

## 🔧 Configuration

### Backend .env
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

### Frontend Configuration
Update `vite.config.js` for API proxy and port settings.

## 📚 Pages

### Home
Landing page with features and call-to-action buttons

### Demo
Showcase of available features and API endpoints with examples

### Features
Detailed feature breakdown organized by category

### Login
Authentication interface with login and registration forms

## 🎓 Architecture

### Frontend Architecture
- Component-based architecture with React
- Custom hooks for state management
- Emotion for styled components
- API abstraction layer with Axios

### Backend Architecture
- MVC pattern with routes, controllers, and models
- Middleware for authentication and error handling
- Centralized logging with Winston
- Database abstraction with pg library

### Database Architecture
- Normalized schema with proper relationships
- pgvector for AI/ML capabilities
- JSONB for flexible metadata
- Comprehensive audit logging

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

## 🚢 Deployment

### Backend Deployment
1. Set environment variables
2. Run migrations: `node database/migrations/migrate.js up`
3. Build and start: `npm run build && npm start`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to static hosting

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and create pull requests with clear descriptions.

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

Made with ❤️ using Node.js, React, and PostgreSQL
