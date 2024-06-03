CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(200) NOT NULL,
  categoryId INT NULL,
  price FLOAT NOT NULL 
);