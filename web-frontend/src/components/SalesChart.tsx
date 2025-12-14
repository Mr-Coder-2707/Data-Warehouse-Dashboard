import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailySales, MonthlySales } from '../types';

interface SalesChartProps {
  dailySales: DailySales[];
  monthlySales: MonthlySales[];
  loading: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ dailySales, monthlySales, loading }) => {
  // Detect screen size for responsive chart height
  const getChartHeight = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 576) return 250;
      if (window.innerWidth < 768) return 280;
      return 300;
    }
    return 300;
  };

  const [chartHeight, setChartHeight] = React.useState(getChartHeight());
  const [isDailyFullscreen, setIsDailyFullscreen] = React.useState(false);
  const [isMonthlyFullscreen, setIsMonthlyFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setChartHeight(getChartHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDailyFullscreen) setIsDailyFullscreen(false);
        if (isMonthlyFullscreen) setIsMonthlyFullscreen(false);
      }
    };

    if (isDailyFullscreen || isMonthlyFullscreen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isDailyFullscreen, isMonthlyFullscreen]);

  const toggleDailyFullscreen = () => {
    setIsDailyFullscreen(!isDailyFullscreen);
  };

  const toggleMonthlyFullscreen = () => {
    setIsMonthlyFullscreen(!isMonthlyFullscreen);
  };

  if (loading) {
    return (
      <div className="charts-section">
        <div className="chart-container">
          <div className="loading">
            <span className="material-icons">sync</span>
            Loading charts...
          </div>
        </div>
      </div>
    );
  }

  const chartConfig = {
    contentStyle: {
      backgroundColor: 'rgba(17, 8, 35, 0.95)',
      border: '1px solid rgba(147, 51, 234, 0.5)',
      borderRadius: '10px',
      color: '#f5f3ff',
      fontSize: window.innerWidth < 576 ? '0.75rem' : '0.85rem'
    }
  };

  return (
    <>
      {isDailyFullscreen && (
        <div className="fullscreen-overlay">
          <div className="chart-container fullscreen">
            <div className="chart-header">
              <h3>
                <span className="material-icons">show_chart</span>
                Daily Sales Trend
              </h3>
              <button 
                className="fullscreen-btn" 
                onClick={toggleDailyFullscreen}
                title="Exit Fullscreen (Esc)"
              >
                <span className="material-icons">fullscreen_exit</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={window.innerHeight - 150}>
              <LineChart data={dailySales} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.2)" />
                <XAxis 
                  dataKey="order_date" 
                  stroke="#c4b5fd"
                  style={{ fontSize: '1rem' }}
                  tick={{ fill: '#c4b5fd' }}
                />
                <YAxis 
                  stroke="#c4b5fd"
                  style={{ fontSize: '1rem' }}
                  tick={{ fill: '#c4b5fd' }}
                />
                <Tooltip 
                  contentStyle={chartConfig.contentStyle}
                />
                <Legend 
                  wrapperStyle={{ 
                    color: '#c4b5fd',
                    fontSize: '1rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total_sales" 
                  stroke="#d946ef" 
                  strokeWidth={4}
                  name="Sales"
                  dot={{ fill: '#9333ea', r: 5 }}
                  activeDot={{ r: 8, fill: '#d946ef' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>
              <span className="material-icons">show_chart</span>
              Daily Sales Trend
            </h3>
            <button 
              className="fullscreen-btn" 
              onClick={toggleDailyFullscreen}
              title="Fullscreen"
            >
              <span className="material-icons">fullscreen</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={dailySales} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.2)" />
              <XAxis 
                dataKey="order_date" 
                stroke="#c4b5fd"
                style={{ fontSize: window.innerWidth < 576 ? '0.7rem' : '0.85rem' }}
                tick={{ fill: '#c4b5fd' }}
                angle={window.innerWidth < 576 ? -45 : 0}
                textAnchor={window.innerWidth < 576 ? 'end' : 'middle'}
                height={window.innerWidth < 576 ? 60 : 30}
              />
              <YAxis 
                stroke="#c4b5fd"
                style={{ fontSize: window.innerWidth < 576 ? '0.7rem' : '0.85rem' }}
                tick={{ fill: '#c4b5fd' }}
              />
              <Tooltip 
                contentStyle={chartConfig.contentStyle}
              />
              <Legend 
                wrapperStyle={{ 
                  color: '#c4b5fd',
                  fontSize: window.innerWidth < 576 ? '0.75rem' : '0.85rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="total_sales" 
                stroke="#d946ef" 
                strokeWidth={window.innerWidth < 576 ? 2 : 3}
                name="Sales"
                dot={{ fill: '#9333ea', r: window.innerWidth < 576 ? 3 : 4 }}
                activeDot={{ r: window.innerWidth < 576 ? 5 : 6, fill: '#d946ef' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>
              <span className="material-icons">bar_chart</span>
              Monthly Sales
            </h3>
            <button 
              className="fullscreen-btn" 
              onClick={toggleMonthlyFullscreen}
              title="Fullscreen"
            >
              <span className="material-icons">fullscreen</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={monthlySales} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.2)" />
            <XAxis 
              dataKey="month" 
              stroke="#c4b5fd"
              style={{ fontSize: window.innerWidth < 576 ? '0.7rem' : '0.85rem' }}
              tick={{ fill: '#c4b5fd' }}
              angle={window.innerWidth < 576 ? -45 : 0}
              textAnchor={window.innerWidth < 576 ? 'end' : 'middle'}
              height={window.innerWidth < 576 ? 60 : 30}
            />
            <YAxis 
              stroke="#c4b5fd"
              style={{ fontSize: window.innerWidth < 576 ? '0.7rem' : '0.85rem' }}
              tick={{ fill: '#c4b5fd' }}
            />
            <Tooltip 
              contentStyle={chartConfig.contentStyle}
            />
            <Legend 
              wrapperStyle={{ 
                color: '#c4b5fd',
                fontSize: window.innerWidth < 576 ? '0.75rem' : '0.85rem'
              }}
            />
            <Bar 
              dataKey="total_sales" 
              fill="#9333ea" 
              name="Sales"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {isMonthlyFullscreen && (
      <div className="fullscreen-overlay">
        <div className="chart-container fullscreen">
          <div className="chart-header">
            <h3>
              <span className="material-icons">bar_chart</span>
              Monthly Sales
            </h3>
            <button 
              className="fullscreen-btn" 
              onClick={toggleMonthlyFullscreen}
              title="Exit Fullscreen (Esc)"
            >
              <span className="material-icons">fullscreen_exit</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={window.innerHeight - 150}>
            <BarChart data={monthlySales} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(147, 51, 234, 0.2)" />
              <XAxis 
                dataKey="month" 
                stroke="#c4b5fd"
                style={{ fontSize: '1rem' }}
                tick={{ fill: '#c4b5fd' }}
              />
              <YAxis 
                stroke="#c4b5fd"
                style={{ fontSize: '1rem' }}
                tick={{ fill: '#c4b5fd' }}
              />
              <Tooltip 
                contentStyle={chartConfig.contentStyle}
              />
              <Legend 
                wrapperStyle={{ 
                  color: '#c4b5fd',
                  fontSize: '1rem'
                }}
              />
              <Bar 
                dataKey="total_sales" 
                fill="#9333ea" 
                name="Sales"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}
    </>
  );
};

export default SalesChart;
