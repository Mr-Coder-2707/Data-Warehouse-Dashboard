import React, { useState, useEffect } from 'react';
import KPICard from '../components/KPICard';
import SalesChart from '../components/SalesChart';
import ProductTable from '../components/ProductTable';
import LoadingScreen from '../components/LoadingScreen';
import SkeletonLoader from '../components/SkeletonLoader';
import DevelopersSection from '../components/DevelopersSection';
import {
  fetchKPIs,
  fetchDailySales,
  fetchMonthlySales,
  fetchTopProducts,
  fetchBottomProducts,
  fetchCategories,
  fetchSalesForecast,
} from '../services/api';
import { KPI, DailySales, MonthlySales, Product, SalesForecast } from '../types';

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPI | null>(null);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [bottomProducts, setBottomProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [forecast, setForecast] = useState<SalesForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate minimum loading time for better UX
    const minLoadTime = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);

    loadData();
    loadCategories();

    return () => clearTimeout(minLoadTime);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [kpiData, dailyData, monthlyData, forecastData] = await Promise.all([
        fetchKPIs(),
        fetchDailySales(),
        fetchMonthlySales(),
        fetchSalesForecast(),
      ]);

      setKpis(kpiData);
      setDailySales(dailyData);
      setMonthlySales(monthlyData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const [top, bottom] = await Promise.all([
        fetchTopProducts(selectedCategory || undefined),
        fetchBottomProducts(selectedCategory || undefined),
      ]);
      setTopProducts(top);
      setBottomProducts(bottom);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Show loading screen on initial load
  if (initialLoading || (loading && !kpis)) {
    return <LoadingScreen />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>
          <span className="material-icons">dashboard</span>
          Data Warehouse Dashboard
        </h1>
      </header>

      <main className="dashboard-content">
        <KPICard kpis={kpis} loading={loading} />

        {forecast && !loading && (
          <div className="forecast-section">
            <h3>
              <span className="material-icons">trending_up</span>
              Sales Forecast
            </h3>
            <p>
              Predicted sales for {forecast.next_month}: 
              <strong> ${forecast.predicted_sales.toLocaleString()}</strong>
            </p>
          </div>
        )}

        <SalesChart 
          dailySales={dailySales} 
          monthlySales={monthlySales} 
          loading={loading} 
        />

        <div className="filter-section">
          <label htmlFor="category-select">
            <span className="material-icons">filter_alt</span>
            Filter by Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="products-section">
          <ProductTable 
            title="Top 10 Products" 
            products={topProducts} 
            loading={loading} 
          />
          <ProductTable 
            title="Bottom 10 Products" 
            products={bottomProducts} 
            loading={loading} 
          />
        </div>

        <DevelopersSection />
      </main>
    </div>
  );
};

export default Dashboard;
