SELECT
    SUM(sales_amount) as total_sales,
    SUM(quantity) as total_quantity,
    COUNT(DISTINCT order_number) as total_orders
FROM gold_fact_sales;
