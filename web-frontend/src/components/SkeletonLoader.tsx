import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  type?: 'kpi' | 'chart' | 'table';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'kpi', count = 1 }) => {
  if (type === 'kpi') {
    return (
      <div className="kpi-container">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-kpi">
            <div className="skeleton skeleton-text skeleton-title"></div>
            <div className="skeleton skeleton-text skeleton-value"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="charts-section">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-chart">
            <div className="skeleton skeleton-text skeleton-chart-title"></div>
            <div className="skeleton skeleton-chart-area"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="products-section">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-table">
            <div className="skeleton skeleton-text skeleton-table-title"></div>
            <div className="skeleton-table-rows">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="skeleton-table-row">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
