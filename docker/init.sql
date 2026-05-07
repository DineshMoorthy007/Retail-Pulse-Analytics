CREATE TABLE IF NOT EXISTS customer (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    registration_date DATE
);

CREATE TABLE IF NOT EXISTS product (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS retail_order (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT,
    order_date DATE,
    channel VARCHAR(20),
    total_amount DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS order_item (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    quantity INT,
    subtotal DECIMAL(10, 2)
);

INSERT INTO customer (id, name, email, registration_date) VALUES 
(1, 'Alice Johnson', 'alice@example.com', '2025-01-15'),
(2, 'Bob Smith', 'bob@example.com', '2025-02-20'),
(3, 'Charlie Davis', 'charlie@example.com', '2025-03-10'),
(4, 'Diana Prince', 'diana@example.com', '2025-04-05'),
(5, 'Edward Norton', 'ed@example.com', '2025-05-12');

INSERT INTO product (id, name, price, category) VALUES 
(1, 'Wireless Mouse', 25.99, 'ELECTRONICS'),
(2, 'Mechanical Keyboard', 89.50, 'ELECTRONICS'),
(3, 'Cotton T-Shirt', 15.00, 'APPAREL'),
(4, 'Denim Jeans', 45.00, 'APPAREL'),
(5, 'Coffee Maker', 120.00, 'HOME_GOODS'),
(6, 'Smart Watch', 199.99, 'ELECTRONICS'),
(7, 'Running Shoes', 75.00, 'APPAREL'),
(8, 'Desk Lamp', 35.00, 'HOME_GOODS');

INSERT INTO retail_order (id, customer_id, order_date, channel, total_amount) VALUES 
(1, 1, '2026-05-01', 'ONLINE', 115.49),
(2, 2, '2026-05-02', 'IN_STORE', 45.00),
(3, 1, '2026-05-03', 'ONLINE', 25.99),
(4, 3, '2026-05-04', 'IN_STORE', 120.00),
(5, 4, '2026-05-05', 'ONLINE', 199.99),
(6, 5, '2026-05-06', 'ONLINE', 110.00),
(7, 2, '2026-05-06', 'IN_STORE', 35.00),
(8, 3, '2026-05-07', 'IN_STORE', 75.00);

INSERT INTO order_item (id, order_id, product_id, quantity, subtotal) VALUES 
(1, 1, 1, 1, 25.99), (2, 1, 2, 1, 89.50),
(3, 2, 4, 1, 45.00),
(4, 3, 1, 1, 25.99),
(5, 4, 5, 1, 120.00),
(6, 5, 6, 1, 199.99),
(7, 6, 2, 1, 89.50), (8, 6, 3, 1, 20.50),
(9, 7, 8, 1, 35.00),
(10, 8, 7, 1, 75.00);