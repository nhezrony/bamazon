
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE  bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    productID VARCHAR
    (50),
    category VARCHAR
    (50),
    price DECIMAL
    (8,8),
    stockQuantity INT
    (8),
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('GRM0335C1E101JA01D', 'capacitors', 0.00225, 150000);
    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('CL03A104KQ3NNNC', 'capacitors', 0.10000, 100000);

    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('ASFL1-25.000MHZ-EC-T', 'oscillators', 0.55500, 10000);
    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('FJ2400002', 'oscillators', 1.25000, 4002);

    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('742792651', 'filters', 0.09500, 488000);
    INSERT INTO products
        (productID, category, price, stockQuantity)
    VALUES
        ('742792031', 'filters', 0.14300, 72000);



