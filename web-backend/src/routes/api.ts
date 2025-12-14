import express from 'express';
import {
  getKPIs,
  getSalesDaily,
  getSalesMonthly,
  getTopProducts,
  getBottomProducts,
  getCategories,
  getProductSales,
  getSalesForecast
} from '../controllers/dataController';
import { apiKeyAuth } from '../middleware/auth';

const router = express.Router();

router.get('/kpis', apiKeyAuth, getKPIs);
router.get('/sales/daily', apiKeyAuth, getSalesDaily);
router.get('/sales/monthly', apiKeyAuth, getSalesMonthly);
router.get('/top-products', apiKeyAuth, getTopProducts);
router.get('/bottom-products', apiKeyAuth, getBottomProducts);
router.get('/categories', apiKeyAuth, getCategories);
router.get('/products/:product_name/sales', apiKeyAuth, getProductSales);
router.get('/sales/forecast', apiKeyAuth, getSalesForecast);

export default router;
