# Task-Manager

A full-stack task management application with authentication, Kanban board, analytics, and task tracking.

[Watch Project Demo Video](https://github.com/user-attachments/assets/d156af9e-1ebe-42e7-b639-ebbcf6d4310d)


## Project Structure

```
task-manager/
├── backend/          # Node.js + Express API
│   ├── modules/
│   │   ├── auth/
│   │   ├── task/
│   │   └── analytics/




│   ├── models/
│   ├── middleware/
│   └── config/
└── frontend/         # React + Tailwind CSS
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    │   └── context/
    └── public/
```

## Local Development

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/?appName=task-manager
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRES_IN=7d
```

3. Install dependencies and run:
```bash
npm install
npm run dev
```

Backend runs at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Create `.env.local` file:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

3. Install dependencies and run:
```bash
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/task-manager.git
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`

### Step 3: Add Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET_KEY`: A secure secret key for JWT
- `JWT_EXPIRES_IN`: 7d (or your preferred duration)

### Step 4: Deploy

Click "Deploy" and wait for the build to complete. Your app will be live at `https://your-project.vercel.app`

### GitHub Actions (Optional Continuous Deployment)

To enable automatic deployment on every push to main:

1. Go to your Vercel dashboard → Settings → Tokens
2. Create a new token and copy it
3. Go to your GitHub repo → Settings → Secrets and variables → Actions
4. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: From Vercel dashboard
   - `VERCEL_PROJECT_ID`: From Vercel dashboard

## Features

- ✅ User Authentication (Signup/Login)
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Kanban Board View
- ✅ Task Analytics
- ✅ JWT-based Authorization
- ✅ Responsive UI with Tailwind CSS

## Tech Stack

**Backend:**
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator

**Frontend:**
- React 19
- Axios
- Tailwind CSS
- Context API

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

On Vercel, the frontend will automatically use the `/api` routes since everything is under the same domain.
