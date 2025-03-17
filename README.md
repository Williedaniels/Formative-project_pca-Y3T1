# API Documentation

```md
# Product Catalog API

A RESTful API for managing e-commerce product catalog.

## Setup

1. Install MongoDB
2. Clone repository
3. Install dependencies:

npm install
```

Create .env file using the example

Start server:

```bash
npm start
```

## API Endpoints

### Products

- 'POST /api/products' - Create new product

- 'GET /api/products' - List all products

- 'GET /api/products/:id' - Get product details

- 'PUT /api/products/:id' - Update product

- 'DELETE /api/products/:id' - Delete product

### Categories

- 'POST /api/categories' - Create new category

- 'GET /api/categories' - List all categories

### Search

- 'GET /api/search/products?q=shirt&category=ID' - Search products

### Reports

- 'GET /api/reports/low-stock?threshold=10' - Get low stock items

## Example Requests

**Create Product:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Premium T-Shirt",
  "price": 39.99,
  "categories": ["CATEGORY_ID"],
  "variants": [{
    "sku": "TSHIRT-BLACK-L",
    "size": "L",
    "color": "Black",
    "inventory": 15
  }]
}' http://localhost:3000/api/products
```

## Assumptions

- Categories must exist before being assigned to products

- Variants are managed as subdocuments within products

- Inventory tracking is at variant level

```text
This complete implementation includes all necessary components for the product catalog API with proper validation, error handling, and documentation. The code follows RESTful principles and includes all required functionality for managing products, categories, search, and reports.
```
