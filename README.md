# 📊 Data Warehouse Web Application

A modern full-stack web application for data warehouse analytics.

## 📁 Project Structure

```
.
├── web-backend/          # Backend API (Node.js + TypeScript + Express)
│   ├── src/              # Source code
│   ├── sql/              # SQL queries
│   ├── gold.db           # SQLite database
│   └── package.json
│
├── web-frontend/         # Frontend (React + TypeScript + Vite)
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json
│
└── WEB_PROJECT_README.md # Detailed setup instructions
```

## 🚀 Quick Start

### Option 1: Using root scripts (recommended)

Install all dependencies:
```bash
npm run install:all
```

Start backend:
```bash
npm run backend
```

Start frontend (in new terminal):
```bash
npm run frontend
```

### Option 2: Manual setup

#### Backend Setup
```bash
cd web-backend
npm install
npm run dev
```
The backend will run on `http://localhost:8000`

#### Frontend Setup
Open a new terminal:
```bash
cd web-frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## ⚠️ Important Notes

Before starting, you need to manually delete the following folders (they contain locked files):
- `backend/` folder - old Python backend
- `node_modules/` folder - root node_modules (not needed)

See `DELETE_BACKEND_FOLDER.txt` for instructions.

Each project (web-frontend and web-backend) has its own dependencies and node_modules.

## 📚 Documentation

- `WEB_PROJECT_README.md` - Complete project documentation
- `web-backend/README.md` - Backend API documentation
- `web-frontend/README.md` - Frontend documentation

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Recharts
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (gold.db)

## ✨ Features

- 📈 Real-time KPI Dashboard
- 📊 Interactive Charts (Daily & Monthly Sales)
- 🔝 Top & Bottom Products
- 🔍 Category Filtering
- 🔮 Sales Forecasting
- 🔐 API Key Authentication

