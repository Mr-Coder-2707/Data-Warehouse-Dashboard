SELECT
    s.order_date,
    SUM(s.sales_amount) as total_sales
FROM gold_fact_sales s
JOIN gold_dim_products p ON s.product_key = p.product_key
WHERE p.product_name = ?
GROUP BY s.order_date
ORDER BY s.order_date;
