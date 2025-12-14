-- PostgreSQL Schema for Data Warehouse
-- This file creates the necessary tables for the data warehouse

-- Drop tables if they exist
DROP TABLE IF EXISTS gold_fact_sales CASCADE;
DROP TABLE IF EXISTS gold_dim_products CASCADE;
DROP TABLE IF EXISTS gold_dim_customers CASCADE;
DROP TABLE IF EXISTS gold_dim_dates CASCADE;

-- Create Dimension Tables

-- Products Dimension
CREATE TABLE gold_dim_products (
    product_key SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    unit_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers Dimension
CREATE TABLE gold_dim_customers (
    customer_key SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    segment VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    region VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dates Dimension
CREATE TABLE gold_dim_dates (
    date_key SERIAL PRIMARY KEY,
    full_date DATE UNIQUE NOT NULL,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    month INTEGER NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    week INTEGER NOT NULL,
    day_of_month INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    is_weekend BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Fact Table

-- Sales Fact
CREATE TABLE gold_fact_sales (
    sales_key SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL,
    order_date DATE NOT NULL,
    product_key INTEGER REFERENCES gold_dim_products(product_key),
    customer_key INTEGER REFERENCES gold_dim_customers(customer_key),
    date_key INTEGER REFERENCES gold_dim_dates(date_key),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 4) DEFAULT 0,
    sales_amount DECIMAL(12, 2) NOT NULL,
    profit DECIMAL(12, 2),
    shipping_cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for better query performance
CREATE INDEX idx_sales_order_date ON gold_fact_sales(order_date);
CREATE INDEX idx_sales_product_key ON gold_fact_sales(product_key);
CREATE INDEX idx_sales_customer_key ON gold_fact_sales(customer_key);
CREATE INDEX idx_sales_date_key ON gold_fact_sales(date_key);
CREATE INDEX idx_sales_order_number ON gold_fact_sales(order_number);
CREATE INDEX idx_products_category ON gold_dim_products(category);
CREATE INDEX idx_products_name ON gold_dim_products(product_name);
CREATE INDEX idx_dates_full_date ON gold_dim_dates(full_date);

-- Create Views for easier querying
CREATE OR REPLACE VIEW v_sales_summary AS
SELECT 
    s.sales_key,
    s.order_number,
    s.order_date,
    p.product_name,
    p.category,
    p.subcategory,
    c.customer_name,
    c.segment,
    c.region,
    s.quantity,
    s.unit_price,
    s.discount,
    s.sales_amount,
    s.profit
FROM gold_fact_sales s
JOIN gold_dim_products p ON s.product_key = p.product_key
JOIN gold_dim_customers c ON s.customer_key = c.customer_key;

-- Sample data insertion (optional - remove if you'll import real data)
-- This is just for testing purposes

-- Insert sample products
INSERT INTO gold_dim_products (product_id, product_name, category, subcategory, unit_price) VALUES
('P001', 'Laptop Dell XPS 13', 'Technology', 'Computers', 1299.99),
('P002', 'Office Chair Executive', 'Furniture', 'Chairs', 249.99),
('P003', 'Notebook A4 Pack', 'Office Supplies', 'Paper', 12.99),
('P004', 'iPhone 14 Pro', 'Technology', 'Phones', 999.99),
('P005', 'Desk Oak Wood', 'Furniture', 'Tables', 399.99);

-- Insert sample customers
INSERT INTO gold_dim_customers (customer_id, customer_name, segment, city, state, country, region) VALUES
('C001', 'Ahmed Mohamed', 'Corporate', 'Cairo', 'Cairo', 'Egypt', 'MENA'),
('C002', 'Sara Ali', 'Consumer', 'Alexandria', 'Alexandria', 'Egypt', 'MENA'),
('C003', 'Mohamed Hassan', 'Home Office', 'Giza', 'Giza', 'Egypt', 'MENA');

-- Insert sample dates (last 30 days)
INSERT INTO gold_dim_dates (full_date, year, quarter, month, month_name, week, day_of_month, day_of_week, day_name, is_weekend)
SELECT 
    d::date,
    EXTRACT(YEAR FROM d)::INTEGER,
    EXTRACT(QUARTER FROM d)::INTEGER,
    EXTRACT(MONTH FROM d)::INTEGER,
    TO_CHAR(d, 'Month'),
    EXTRACT(WEEK FROM d)::INTEGER,
    EXTRACT(DAY FROM d)::INTEGER,
    EXTRACT(DOW FROM d)::INTEGER,
    TO_CHAR(d, 'Day'),
    EXTRACT(DOW FROM d) IN (0, 6)
FROM generate_series(
    CURRENT_DATE - INTERVAL '30 days',
    CURRENT_DATE,
    '1 day'::interval
) d;

-- Insert sample sales
INSERT INTO gold_fact_sales (order_number, order_date, product_key, customer_key, date_key, quantity, unit_price, discount, sales_amount, profit, shipping_cost)
SELECT 
    'ORD-' || LPAD(gs::TEXT, 6, '0'),
    CURRENT_DATE - (RANDOM() * 30)::INTEGER,
    (RANDOM() * 4 + 1)::INTEGER,
    (RANDOM() * 2 + 1)::INTEGER,
    (SELECT date_key FROM gold_dim_dates ORDER BY RANDOM() LIMIT 1),
    (RANDOM() * 5 + 1)::INTEGER,
    (RANDOM() * 1000 + 100)::NUMERIC(10,2),
    (RANDOM() * 0.2)::NUMERIC(5,4),
    (RANDOM() * 5000 + 100)::NUMERIC(12,2),
    (RANDOM() * 500 + 50)::NUMERIC(12,2),
    (RANDOM() * 50 + 5)::NUMERIC(10,2)
FROM generate_series(1, 100) gs;

-- Update sales_amount based on quantity and unit_price
UPDATE gold_fact_sales 
SET sales_amount = quantity * unit_price * (1 - discount);
