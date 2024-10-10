# StockMaster - Inventory Management Application

StockMaster is a simple and efficient inventory management application built with Node.js, Fastify, Knex, and MySQL. It allows admins to manage items, track inventory changes, and view transaction history with authentication and authorization support.

## Features

### 1. Inventory Management
- **Add New Items**: Add new inventory items with name, category, stock, and price.
- **Update Item Details**: Update item information such as name, category, stock, and price.
- **Reduce Stock**: Decrease the stock when sales or usage occur, with automatic transaction history tracking.
- **Calculate Total Inventory Value**: Calculate the total value of inventory (stock * price).

### 2. Transaction History Management
- **Track Stock Changes**: Record every stock change (increase or decrease) in a transaction history table.
- **Pagination on Transaction History**: View paginated transaction history.

### 3. Admin Authentication & Authorization
- **Admin Registration and Login**: Register new admins and login with secure password hashing (bcrypt) and JWT-based authentication.
- **Protected Routes**: Ensure that only authenticated admins can perform inventory management tasks.

## Project Structure

```
.
├── src
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── routes
│   ├── seeds
│   └── app.js
├── knexfile.js
├── .env
├── package.json
└── README.md
```

## Prerequisites

To run this application, you will need:

- **Node.js**: v20.18.0 or later
- **MySQL**: Running MySQL server for database management

## Installation

1. Clone the repository:

```bash
git clone https://github.com/arizdn234/StockMaster.git
cd StockMaster
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the `.env` file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_management
JWT_SECRET=your_jwt_secret
```

4. Create the MySQL database and tables using the following schema:

```sql
CREATE DATABASE inventory_management;

USE inventory_management;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  stock INT DEFAULT 0,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  quantity_change INT,
  total_value FLOAT,
  type VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT "admin",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Run database migrations (if applicable) or seeders with Knex.

6. Start the server:

```bash
npm run dev
```

The app will be running on `http://localhost:8787`.

## API Endpoints

### Authentication

- **POST `/auth/register`**  
  Register a new user admin.  
  Request body: `{ "username": "admin", "password": "password" }`

- **POST `/auth/login`**  
  Admin login and receive a JWT token.  
  Request body: `{ "username": "admin", "password": "password" }`  
  Response: `{ "token": "your_jwt_token" }`

### Items

- **POST `/items/`**  
  Add a new item.  
  Request body: `{ "name": "item1", "category": "category1", "stock": 10, "price": 100 }`

- **PUT `/items/:id`**  
  Update an existing item.  
  Request body: `{ "name": "item2", "category": "category2", "stock": 15, "price": 120 }`

- **POST `/items/:id/reduce-stock`**  
  Reduce the stock of an item.  
  Request body: `{ "amount": 5 }`

- **GET `/items`**  
  Get the entire inventory value.

### Transactions

- **GET /transactions?page=1&limit=10**  
  Get paginated transaction history.

## Middleware

- **JWT Authorization**  
  Protected routes for items and transactions are protected by JWT.  
  Add the JWT token in the `Authorization` header as `Bearer token`.

## Environment Variables

- `DB_HOST`: MySQL database host (e.g., `localhost`)
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name (e.g., `inventory_management`)
- `JWT_SECRET`: Secret key used for signing JWT tokens

## Technologies Used

- **Node.js**: Backend runtime.
- **Fastify**: Web framework for building APIs.
- **Knex.js**: SQL query builder for MySQL.
- **MySQL**: Database for storing items, transactions, and admin data.
- **bcryptjs**: For password hashing.
- **jsonwebtoken**: For JWT-based authentication.

## Future Enhancements

- Admin dashboard with graphical reports.
- Low-stock notifications.
- Advanced search and filtering for transactions and items.

## License

This project is licensed under the MIT License.