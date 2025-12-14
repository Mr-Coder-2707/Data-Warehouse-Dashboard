# 📊 Data Warehouse Web Application - TypeScript

A modern full-stack web application for data warehouse analytics, built with **TypeScript**, **Node.js/Express**, and **React**.

## 🏗️ Project Structure

```
.
├── web-backend/          # Backend API (Node.js + TypeScript + Express)
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # API controllers
│   │   ├── middleware/   # Authentication middleware
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Main server file
│   ├── sql/              # SQL query files
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── web-frontend/         # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API service layer
│   │   ├── types/        # TypeScript type definitions
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/              # Original Python backend (for reference)
    └── gold.db           # SQLite database
```

## ✨ Features

- 📈 **Real-time KPI Dashboard** - Display total sales, quantity, and orders
- 📊 **Interactive Charts** - Daily and monthly sales visualizations using Recharts
- 🔝 **Product Rankings** - Top and bottom performing products
- 🔍 **Category Filtering** - Filter products by category
- 🔮 **Sales Forecasting** - Predict future sales using linear regression
- 🔐 **API Key Authentication** - Secure API endpoints
- 🎨 **Modern UI** - Responsive design with gradient styling

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- SQLite database (`backend/gold.db`)

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd web-backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Configure environment variables (`.env`):
   ```env
   PORT=8000
   API_KEY=secret-key
   DB_PATH=../backend/gold.db
   ```

4. Run in development mode:
   ```powershell
   npm run dev
   ```

5. Or build and run:
   ```powershell
   npm run build
   npm start
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd web-frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Run in development mode:
   ```powershell
   npm run dev
   ```

4. Or build for production:
   ```powershell
   npm run build
   npm run preview
   ```

The frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

All endpoints require the `X-API-Key` header with value `secret-key`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/kpis` | Get KPIs (total sales, quantity, orders) |
| GET | `/api/sales/daily` | Get daily sales data |
| GET | `/api/sales/monthly` | Get monthly sales data |
| GET | `/api/top-products?category=` | Get top 10 products (optional category filter) |
| GET | `/api/bottom-products?category=` | Get bottom 10 products (optional category filter) |
| GET | `/api/categories` | Get all product categories |
| GET | `/api/products/:name/sales` | Get sales history for specific product |
| GET | `/api/sales/forecast` | Get sales forecast for next month |

## 🛠️ Technologies Used

### Backend
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Database driver
- **regression** - Linear regression for forecasting
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Charting library
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## 📝 Environment Variables

### Backend (`.env`)
```env
PORT=8000                      # Server port
API_KEY=secret-key             # API authentication key
DB_PATH=../backend/gold.db     # Path to SQLite database
```

### Frontend
API configuration is in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
const API_KEY = 'secret-key';
```

## 🔒 Security

- API endpoints are protected with API key authentication
- CORS is enabled for cross-origin requests
- Environment variables for sensitive data

## 📊 Database Schema

The application uses SQLite with the following main tables:
- `gold_fact_sales` - Sales transactions
- `gold_dim_products` - Product dimensions
- `gold_dim_customers` - Customer dimensions

## 🎨 UI Features

- **Responsive Design** - Works on desktop and mobile
- **Gradient Themes** - Modern purple gradient header
- **Interactive Charts** - Hover tooltips and legends
- **Loading States** - User-friendly loading indicators
- **Category Filter** - Dynamic product filtering
- **Hover Effects** - Smooth animations on cards

## 🚧 Development

### Backend Commands
```powershell
npm run dev      # Run with hot reload (ts-node-dev)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run watch    # Watch mode for TypeScript compilation
```

### Frontend Commands
```powershell
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time data updates with WebSockets
- [ ] More advanced forecasting models
- [ ] Export data to CSV/Excel
- [ ] Dark mode theme
- [ ] Advanced filtering and search
- [ ] Drill-down analytics
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ using TypeScript, React, and Node.js

---

**Note**: Make sure the SQLite database (`backend/gold.db`) exists and contains data before running the application.
