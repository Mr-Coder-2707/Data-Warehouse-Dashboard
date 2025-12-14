import { Request, Response } from 'express';
import { executeQuery } from '../config/database';
import regression from 'regression';

interface KPI {
  total_sales: number;
  total_quantity: number;
  total_orders: number;
}

interface DailySales {
  order_date: string;
  total_sales: number;
}

interface MonthlySales {
  month: string;
  total_sales: number;
}

interface Product {
  product_name: string;
  total_sales: number;
}

interface Category {
  category: string;
}

export const getKPIs = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await executeQuery<KPI>('kpis.sql');
    res.json(results[0] || {});
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};

export const getSalesDaily = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await executeQuery<DailySales>('sales_daily.sql');
    res.json(results);
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    res.status(500).json({ error: 'Failed to fetch daily sales' });
  }
};

export const getSalesMonthly = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await executeQuery<MonthlySales>('sales_monthly.sql');
    res.json(results);
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    res.status(500).json({ error: 'Failed to fetch monthly sales' });
  }
};

export const getTopProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const results = await executeQuery<Product>('top_products.sql', [category || null, category || null]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
};

export const getBottomProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const results = await executeQuery<Product>('bottom_products.sql', [category || null, category || null]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching bottom products:', error);
    res.status(500).json({ error: 'Failed to fetch bottom products' });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await executeQuery<Category>('categories.sql');
    const categories = results.map(row => row.category);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getProductSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_name } = req.params;
    const results = await executeQuery<DailySales>('sales_product_history.sql', [product_name]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching product sales:', error);
    res.status(500).json({ error: 'Failed to fetch product sales' });
  }
};

export const getSalesForecast = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await executeQuery<MonthlySales>('sales_monthly.sql');
    
    if (results.length === 0) {
      res.json({ forecast: 0, message: 'Not enough data' });
      return;
    }

    // Prepare data for regression
    const data: [number, number][] = results.map((row, index) => [index, row.total_sales]);
    
    // Perform linear regression
    const result = regression.linear(data);
    
    // Predict next month
    const nextIndex = results.length;
    const prediction = result.predict(nextIndex)[1];

    // Calculate next month
    const lastMonth = results[results.length - 1].month;
    const lastDate = new Date(lastMonth + '-01');
    lastDate.setMonth(lastDate.getMonth() + 1);
    const nextMonth = lastDate.toISOString().substring(0, 7);

    res.json({
      next_month: nextMonth,
      predicted_sales: Math.round(prediction * 100) / 100
    });
  } catch (error) {
    console.error('Error forecasting sales:', error);
    res.status(500).json({ error: 'Failed to forecast sales' });
  }
};
