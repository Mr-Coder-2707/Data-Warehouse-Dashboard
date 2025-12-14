export interface KPI {
  total_sales: number;
  total_quantity: number;
  total_orders: number;
}

export interface DailySales {
  order_date: string;
  total_sales: number;
}

export interface MonthlySales {
  month: string;
  total_sales: number;
}

export interface Product {
  product_name: string;
  total_sales: number;
}

export interface SalesForecast {
  next_month: string;
  predicted_sales: number;
  message?: string;
}
