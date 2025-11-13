# Quick Start Guide

Get the Full-Stack Application running in under 10 minutes!

## Prerequisites ✅

Ensure you have installed:
- Node.js v16+ ([Download](https://nodejs.org/))
- PostgreSQL 13+ ([Download](https://www.postgresql.org/download/))
- Git

Verify installations:
```bash
node --version
npm --version
psql --version
```

## 1️⃣ Setup Database (2 minutes)

```bash
# Create database
createdb fullstack_db

# Enable pgvector
psql fullstack_db -c "CREATE EXTENSION vector;"

# Run migrations
cd database/migrations
node migrate.js up
cd ../..

# Seed sample data
cd database/seeds
node seed_data.js
cd ../..
```

## 2️⃣ Install Dependencies (1 minute)

From the root directory:
```bash
npm install
```

This installs dependencies for backend, frontend, and root due to npm workspaces.

## 3️⃣ Start Backend (1 minute)

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
```

## 4️⃣ Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

## 5️⃣ Open in Browser

Navigate to: **http://localhost:3000**

## ✨ You're Done!

Now you can:
- 🏠 Visit the home page
- 🎨 Toggle light/dark theme
- 📖 View demo features
- 🔐 Test login/registration
- 🔗 Check API endpoints

## 🎯 What's Working

✅ Full-stack architecture
✅ Authentication system  
✅ Light/Dark theme
✅ Modern UI components
✅ API endpoints
✅ Database with pgvector
✅ Responsive design

## 📚 Next Steps

1. **Explore Code**: Check `backend/` and `frontend/` folders
2. **Read Docs**: See `SETUP.md` for detailed instructions
3. **API Reference**: See `API.md` for endpoints
4. **Database Docs**: See `database/README.md`
5. **Main README**: See `README.md` for full info

## 🔗 Important Links

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## ⚠️ Troubleshooting

### Database Already Exists
```bash
dropdb fullstack_db
createdb fullstack_db
psql fullstack_db -c "CREATE EXTENSION vector;"
```

### Port Already in Use
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Or change port in backend/.env
PORT=5001
```

### Dependencies Not Installing
```bash
# Clear cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

## 🎓 Default Test Credentials

Use any email/password to test the demo:
- **Email**: demo@example.com
- **Password**: demo123

## 🚀 Common Commands

```bash
# From root directory
npm run dev              # Start everything
npm run dev:backend     # Backend only
npm run dev:frontend    # Frontend only
npm run build           # Build production

# Backend
cd backend && npm run dev     # Dev server
cd backend && npm test        # Run tests

# Frontend
cd frontend && npm run dev    # Dev server
cd frontend && npm run build  # Production build
```

## 📝 Environment Variables

Backend `.env` is pre-configured. For frontend, create `.env`:

```bash
cd frontend
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
```

## 🎨 Theme System

- **Light Theme**: Default on first visit or system light mode
- **Dark Theme**: Click moon icon in navbar
- **Persistence**: Theme preference saved in localStorage

## 🔐 Authentication

1. Go to `/login`
2. Click "Sign up here" to register
3. Enter any email/password
4. Receive JWT token automatically
5. Token stored in localStorage
6. Use token for API calls

## 📱 Responsive Design

Website works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)

## 🐛 Debug Mode

Enable debug logging:

```bash
# Backend
cd backend
echo "LOG_LEVEL=debug" >> .env
npm run dev
```

Check logs in `backend/logs/` directory.

## 🆘 Getting Help

1. Check error messages in browser console (F12)
2. Check backend logs in `backend/logs/`
3. Read documentation files
4. Try restarting services

## 🎉 Success Checklist

- [ ] Node.js and PostgreSQL installed
- [ ] Database created and migrations run
- [ ] Dependencies installed
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can access http://localhost:3000
- [ ] Theme toggle works
- [ ] Can navigate to all pages
- [ ] Demo page shows content

---

**Ready to develop?** 🚀

Check out the detailed setup guide: [SETUP.md](./SETUP.md)

For API documentation: [API.md](./API.md)

For project overview: [README.md](./README.md)
