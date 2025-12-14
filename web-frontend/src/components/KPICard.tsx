import React from 'react';
import { KPI } from '../types';

interface KPICardProps {
  kpis: KPI | null;
  loading: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ kpis, loading }) => {
  if (loading) {
    return (
      <div className="kpi-container">
        <div className="loading">
          <span className="material-icons">sync</span>
          Loading KPIs...
        </div>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="kpi-container">
        <div className="loading">
          <span className="material-icons">info</span>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <div className="kpi-card-content">
          <h3>
            <span className="material-icons">attach_money</span>
            Total Sales
          </h3>
          <p className="kpi-value">${kpis.total_sales?.toLocaleString() || 0}</p>
        </div>
      </div>
      <div className="kpi-card">
        <div className="kpi-card-content">
          <h3>
            <span className="material-icons">inventory_2</span>
            Total Quantity
          </h3>
          <p className="kpi-value">{kpis.total_quantity?.toLocaleString() || 0}</p>
        </div>
      </div>
      <div className="kpi-card">
        <div className="kpi-card-content">
          <h3>
            <span className="material-icons">shopping_cart</span>
            Total Orders
          </h3>
          <p className="kpi-value">{kpis.total_orders?.toLocaleString() || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
