# Trips & Travels

Monorepo with:
- `frontend/`: Vite + React app
- `backend/`: Node.js + Express API (MongoDB)

## Run locally

### 1) Backend

Create `backend/.env` (see `backend/.env.example`), then:

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:3050/`  
API base: `http://localhost:3050/api`

### 2) Frontend

Create `frontend/.env` (see `frontend/.env.example`), then:

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

## Deploy (recommended)

### A) Database: MongoDB Atlas

1. Create a free cluster on MongoDB Atlas
2. Create a DB user + allow your hosting provider IPs (or `0.0.0.0/0` for quick testing)
3. Copy the connection string and set it as `MONGO_URL` on the backend host

### B) Backend: Render (Web Service)

1. Render → **New** → **Web Service** → connect this GitHub repo
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Add environment variables:
   - `MONGO_URL` = your Atlas connection string
   - `JWT_SECRET` = a long random string
   - `FRONTEND_URL` = your deployed frontend URL (or set `CORS_ORIGINS` to a comma-separated list)
   - Do **not** set `PORT` on Render (Render sets it automatically)

After deploy, you’ll get an API URL like:
`https://<your-service>.onrender.com`

### C) Frontend: Vercel (Static site)

1. Vercel → **New Project** → import this GitHub repo
2. **Root Directory**: `frontend`
3. Add environment variable:
   - `VITE_API_BASE_URL` = `https://<your-render-service>.onrender.com/api`
4. Deploy

## CORS notes (backend)

The backend only allows requests from:
- `FRONTEND_URL`, or
- `CORS_ORIGINS` (comma-separated)

Set one of these on your backend host to match your deployed frontend domain.
