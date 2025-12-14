SELECT
    p.product_name,
    SUM(s.sales_amount) as total_sales
FROM gold_fact_sales s
JOIN gold_dim_products p ON s.product_key = p.product_key
WHERE (? IS NULL OR p.category = ?)
GROUP BY p.product_name
ORDER BY total_sales ASC
LIMIT 10;
