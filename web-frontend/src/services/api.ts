import axios from 'axios';
import { KPI, DailySales, MonthlySales, Product, SalesForecast } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';
const API_KEY = 'secret-key';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
});

export const fetchKPIs = async (): Promise<KPI> => {
  const response = await api.get<KPI>('/kpis');
  return response.data;
};

export const fetchDailySales = async (): Promise<DailySales[]> => {
  const response = await api.get<DailySales[]>('/sales/daily');
  return response.data;
};

export const fetchMonthlySales = async (): Promise<MonthlySales[]> => {
  const response = await api.get<MonthlySales[]>('/sales/monthly');
  return response.data;
};

export const fetchTopProducts = async (category?: string): Promise<Product[]> => {
  const response = await api.get<Product[]>('/top-products', {
    params: { category },
  });
  return response.data;
};

export const fetchBottomProducts = async (category?: string): Promise<Product[]> => {
  const response = await api.get<Product[]>('/bottom-products', {
    params: { category },
  });
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/categories');
  return response.data;
};

export const fetchProductSales = async (productName: string): Promise<DailySales[]> => {
  const response = await api.get<DailySales[]>(`/products/${productName}/sales`);
  return response.data;
};

export const fetchSalesForecast = async (): Promise<SalesForecast> => {
  const response = await api.get<SalesForecast>('/sales/forecast');
  return response.data;
};
