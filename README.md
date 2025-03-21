# Product Catalog API

A RESTful API for managing an e-commerce product catalog. This API allows you to manage products, categories, search for products, and generate reports.

## Setup

1. **Install MongoDB:** Ensure you have MongoDB installed and running on your system.
2. **Clone Repository:** Clone this repository to your local machine.
3. **Install Dependencies:** Navigate to the project directory in your terminal and run:

    ```bash
    npm install
    ```

4. **Create `.env` File:**
    * Create a `.env` file in the root of your project.
    * Add the following environment variables, replacing the values with your actual configuration:

```text
MONGODB_URI=mongodb://localhost:27017/your_database_name
PORT=3000
```

* Replace `your_database_name` with the name of your MongoDB database.
* You can change the `PORT` if you want to use a different port.

5.**Seed the Database (Optional):**
    * To populate the database with sample data, run:

```bash
node src/utils/seedDatabase.js
```

6.**Start Server:**

```bash
node src/app.js
```

## API Endpoints

### Products

* **`POST /api/products`** - Create a new product.
  * **Request Body:**

```json
        {
          "name": "Product Name",
          "price": 99.99,
          "description": "Product Description",
          "variants": [
            {
              "name": "Variant Name",
              "price": 99.99,
              "inventory": 10
            }
          ],
          "categories": ["category_id"] // Optional: Array of category IDs
        }
```

* **Response:** Returns the created product.
* **`GET /api/products`** - List all products.
  * **Response:** Returns an array of all products.
* **`GET /api/products/:id`** - Get product details by ID.
  * **Response:** Returns the product with the specified ID.
* **`PUT /api/products/:id`** - Update a product by ID (replaces the entire product).
  * **Request Body:**

```json
        {
          "name": "Updated Product Name",
          "price": 149.99,
          "description": "Updated Product Description",
          "variants": [
            {
              "_id": "existing_variant_id", // Optional: If you want to update an existing variant, include its ID
              "name": "Updated Variant Name",
              "price": 149.99,
              "inventory": 20
            },
            {
              "name": "New Variant Name", // Optional: If you want to add a new variant, don't include an _id
              "price": 199.99,
              "inventory": 10
            }
          ],
          "categories": ["category_id"] // Optional: Array of category IDs
        }
```

* **Response:** Returns the updated product.
* **`PATCH /api/products/:id`** - Partially update a product by ID.
  * **Request Body:** You can include any of the product fields to update them.

```json
        {
          "price": 199.99,
          "description": "Updated Product Description"
        }
        ```

        or

        ```json
        {
          "variants": [
            {
              "_id": "existing_variant_id",
              "name": "Updated Variant Name",
              "price": 149.99,
              "inventory": 20
            }
          ]
        }
```

* **Response:** Returns the updated product.
* **`DELETE /api/products/:id`** - Delete a product by ID.
  * **Response:** Returns a success message.

### Product Variants

* **`POST /api/products/:productId/variants`** - Add a new variant to a product.
  * **Request Body:**

```json
        {
          "name": "Variant Name",
          "price": 99.99,
          "inventory": 10
        }
```

* **Response:** Returns the updated product with the new variant.
* **`PUT /api/products/:productId/variants/:variantId`** - Update a specific variant of a product.
  * **Request Body:**

```json
        {
          "name": "Updated Variant Name",
          "price": 149.99,
          "inventory": 20
        }
```

* **Response:** Returns the updated product with the modified variant.
* **`DELETE /api/products/:productId/variants/:variantId`** - Delete a specific variant of a product.
  * **Response:** Returns the updated product.

### Categories

* **`POST /api/categories`** - Create a new category.
  * **Request Body:**

```json
  {
    "name": "Category Name"
  }
```

* **Response:** Returns the created category.
* **`GET /api/categories`** - List all categories.
  * **Response:** Returns an array of all categories.
* **`GET /api/categories/:id`** - Get category details by ID.
  * **Response:** Returns the category with the specified ID.
* **`PUT /api/categories/:id`** - Update a category by ID.
  * **Request Body:**

```json
  {
    "name": "Updated Category Name"
  }
```

* **Response:** Returns the updated category.
* **`DELETE /api/categories/:id`** - Delete a category by ID.
  * **Response:** Returns a success message.

### Search

* **`GET /api/search`** - Search for products.
  * **Query Parameters:**
    * `q`: Search term (e.g., `?q=shirt`).
    * `category`: Category ID (e.g., `?category=category_id`).
    * `minPrice`: Minimum price (e.g., `?minPrice=10`).
    * `maxPrice`: Maximum price (e.g., `?maxPrice=100`).
  * **Response:** Returns an array of products matching the search criteria.

### Reports

* **`GET /api/reports/low-stock`** - Get a list of low-stock products.
  * **Query Parameters:**
    * `threshold`: The inventory threshold for low stock (default: 10) (e.g., `?threshold=5`).
  * **Response:** Returns an array of products with low stock.

## Example Requests

**Create Product:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Premium T-Shirt",
  "price": 39.99,
  "description": "A high-quality t-shirt",
  "categories": [],
  "variants": [{
    "name": "Black-L",
    "price": 39.99,
    "inventory": 15
  }]
}' http://localhost:3000/api/products
```

## Update Products

```sh
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Updated T-Shirt",
  "price": 49.99,
  "description": "An updated high-quality t-shirt",
  "categories": [],
  "variants": [{
    "_id": "existing_variant_id",
    "name": "Black-L",
    "price": 49.99,
    "inventory": 20
  }]
}' http://localhost:3000/api/products/product_id
```

## Partially Update Products

```sh
curl -X PATCH -H "Content-Type: application/json" -d '{
  "price": 59.99
}' http://localhost:3000/api/products/product_id
```

## Search Products

```sh
curl http://localhost:3000/api/search?q=shirt
```

## Get Low-Stock Products

```sh
curl http://localhost:3000/api/reports/low-stock
```

## Assumptions

* Categories: Categories must exist before being assigned to products.
* Variants: Variants are managed as subdocuments within products.
* Inventory: Inventory tracking is at the variant level.
* PUT: The PUT request replaces the entire product.
* PATCH: The PATCH request partially updates the product.
* Variants:
  * If you want to update an existing variant, include its _id.
  * If you want to add a new variant, don't include an _id.
  * If you remove a variant from the request body, it will be removed from the product.

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios, including:

* 400 Bad Request: For invalid request data or validation errors.
* 404 Not Found: For resources that do not exist.
* 500 Internal Server Error: For unexpected server errors.

## Notes

* Remember to replace placeholders like 'product_id', 'category_id', and 'existing_variant_id' with actual IDs from your database.
* You can use tools like Postman or curl to test the API endpoints.
* The 'seedDatabase.js' file will create two categories and two products.
