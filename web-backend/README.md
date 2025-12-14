# 🚀 Web Backend - Data Warehouse API

Backend API built with Node.js, Express, and TypeScript.

## 📁 Structure

```
web-backend/
├── src/
│   ├── config/       # Database configuration
│   ├── controllers/  # API controllers
│   ├── middleware/   # Authentication middleware
│   ├── routes/       # API routes
│   └── server.ts     # Main server file
├── sql/              # SQL query files
├── gold.db           # SQLite database
├── .env              # Environment variables
└── package.json
```

## 🔧 Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=8000
API_KEY=secret-key
DB_PATH=./gold.db
NODE_ENV=development
```

3. Build TypeScript:
```bash
npm run build
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

All endpoints require `X-API-Key` header with the value from `.env`

- `GET /api/kpis` - Get KPI metrics
- `GET /api/sales-daily` - Get daily sales data
- `GET /api/sales-monthly` - Get monthly sales data
- `GET /api/categories` - Get product categories
- `GET /api/top-products` - Get top performing products
- `GET /api/bottom-products` - Get bottom performing products
- `GET /api/sales-product-history` - Get product sales history

## 🗄️ Database

The SQLite database (`gold.db`) contains the data warehouse with sales, products, and customer information.

## 🛠️ Technologies

- Node.js
- Express
- TypeScript
- SQLite3
- CORS
- Dotenv
