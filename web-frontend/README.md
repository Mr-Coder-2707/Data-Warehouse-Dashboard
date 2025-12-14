# 🎨 Web Frontend - Data Warehouse Dashboard

Modern React dashboard built with TypeScript and Vite.

## 📁 Structure

```
web-frontend/
├── src/
│   ├── components/   # React components
│   │   ├── CategoryFilter.tsx
│   │   ├── BottomProducts.tsx
│   │   ├── DailySalesChart.tsx
│   │   ├── KPICard.tsx
│   │   ├── MonthlySalesChart.tsx
│   │   ├── ProductSalesHistory.tsx
│   │   ├── SalesForecast.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── TopProducts.tsx
│   ├── services/     # API service layer
│   │   └── api.ts
│   ├── types/        # TypeScript types
│   │   └── index.ts
│   ├── App.tsx       # Main application
│   ├── App.css       # Styles
│   └── main.tsx      # Entry point
├── public/           # Static assets
└── package.json
```

## 🔧 Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API endpoint in `src/services/api.ts`:
```typescript
const API_URL = 'http://localhost:8000/api';
const API_KEY = 'secret-key';
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## ✨ Features

- 📊 **Real-time KPI Dashboard** - Total sales, quantity, and orders
- 📈 **Interactive Charts** - Daily and monthly sales using Recharts
- 🔝 **Product Rankings** - Top and bottom products
- 🔍 **Category Filtering** - Filter products by category
- 🔮 **Sales Forecasting** - Linear regression predictions
- ⚡ **Fast Loading** - Skeleton loaders for better UX
- 🎨 **Modern UI** - Responsive gradient design

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- Axios
- Recharts
- React Router DOM

## 🚀 Development

The app runs on `http://localhost:5173` by default and connects to the backend API at `http://localhost:8000`.

Make sure the backend server is running before starting the frontend.
