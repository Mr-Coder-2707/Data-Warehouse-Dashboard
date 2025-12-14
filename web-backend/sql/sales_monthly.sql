SELECT
    strftime('%Y-%m', order_date) as month,
    SUM(sales_amount) as total_sales
FROM gold_fact_sales
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month;
