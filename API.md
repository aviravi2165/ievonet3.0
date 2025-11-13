# API Documentation

Complete API reference for the Full-Stack Application Backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are in JSON format.

### Success Response

```json
{
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response

```json
{
  "message": "Error description"
}
```

## Endpoints

### Health & Info

#### GET /health

Check the API health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

**Status Code:** 200

---

#### GET /

Get API information.

**Response:**
```json
{
  "message": "API is running",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Status Code:** 200

---

### Authentication

#### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Required Fields:**
- `email` (string, unique, valid email format)
- `password` (string, min 8 characters recommended)
- `name` (string)

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- 400: Missing required fields
- 409: Email already exists

---

#### POST /auth/login

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Required Fields:**
- `email` (string)
- `password` (string)

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- 400: Missing email or password
- 401: Invalid credentials

---

#### GET /auth/profile

Get current user's profile information.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- 401: No token provided or invalid token
- 404: User not found

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Examples

### cURL Examples

#### Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "MySecurePassword123",
    "name": "Jane Smith"
  }'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "MySecurePassword123"
  }'
```

#### Get Profile (with token)

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/auth/profile
```

#### Check Health

```bash
curl http://localhost:5000/api/health
```

---

### JavaScript/Fetch Examples

#### Register

```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
  }),
});

const data = await response.json();
console.log(data);
```

#### Login

```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
const token = data.token;
localStorage.setItem('token', token);
```

#### Get Profile

```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const data = await response.json();
console.log(data);
```

---

### Axios Examples

The frontend uses Axios with preconfigured interceptors. See `frontend/src/utils/api.js`

```javascript
import { authAPI } from './utils/api';

// Register
const registerResponse = await authAPI.register('user@example.com', 'password123', 'John Doe');

// Login
const loginResponse = await authAPI.login('user@example.com', 'password123');

// Get Profile (token automatically included)
const profileResponse = await authAPI.getProfile();
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding:

- express-rate-limit package
- Redis-based rate limiting
- API key-based access control

---

## Error Handling

The API returns meaningful error messages:

```json
{
  "message": "Invalid credentials"
}
```

For debugging, check the server logs in `backend/logs/`.

---

## CORS Configuration

CORS is enabled for the frontend URL:

```
CORS_ORIGIN=http://localhost:3000
```

Modify in `.env` for different domains.

---

## Token Structure

JWT tokens contain the following claims:

```json
{
  "userId": 1,
  "iat": 1234567890,
  "exp": 1235000000
}
```

**Token Expiration:** 7 days (configurable in `.env` via `JWT_EXPIRE`)

---

## Future API Endpoints (Planned)

- `POST /api/files/upload` - Upload files
- `GET /api/embeddings` - List user embeddings
- `POST /api/embeddings` - Create embeddings
- `GET /api/embeddings/:id` - Get embedding details
- `DELETE /api/users/:id` - Delete user account
- `PUT /api/users/:id` - Update user profile

---

## Webhook Endpoints (Future)

Planned webhook support for:
- User registration events
- File upload completion
- Embedding processing status

---

## Versioning

Current API Version: **1.0.0**

Future versions will use URL versioning:
- `/api/v1/...`
- `/api/v2/...`

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store tokens securely** (httpOnly cookies preferred)
3. **Validate input** on both client and server
4. **Handle errors gracefully** in frontend
5. **Log important events** for audit trails
6. **Refresh tokens** when approaching expiration
7. **Use environment variables** for sensitive data

---

## Troubleshooting

### "Invalid or expired token"
- Token may have expired (check expiration in .env)
- Token format may be incorrect
- Resend valid token in Authorization header

### "No token provided"
- Add Authorization header
- Format: `Authorization: Bearer <token>`

### "Email already exists"
- Use a different email address
- Or login with existing credentials

### "Invalid credentials"
- Check email/password combination
- Ensure user is registered

---

## Support

For API issues or feature requests, refer to the main README.md or contact support.
