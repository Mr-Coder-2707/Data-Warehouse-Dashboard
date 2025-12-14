SELECT
    order_date,
    SUM(sales_amount) as total_sales
FROM gold_fact_sales
GROUP BY order_date
ORDER BY order_date;
