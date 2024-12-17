# 🛍️ Multi-Vendor E-Commerce Platform

## 📝 Project Overview

This is a comprehensive multi-vendor e-commerce platform that allows both buyers and sellers to interact within a single ecosystem. Users can register as shoppers or shop owners, browse products, make purchases, and even set up their own online stores.

## 🚀 Key Features

- Dual-role authentication (Users & Shop Owners)
- Product browsing and purchasing
- Shop owner product management
- User cart and order tracking
- Secure authentication system

## 🔐 Authentication Routes

### User Authentication
- `GET /auth/pages/users/loginpage`: User login page
- `GET /auth/pages/users/registerpage`: User registration page
- `POST /api/auth/users/register`: Register new user
- `POST /api/auth/users/login`: User login
- `POST /api/auth/logout`: Logout for users

### Owner Authentication
- `GET /auth/pages/owner/loginpage`: Shop owner login page
- `GET /auth/pages/owner/registerpage`: Shop owner registration page
- `POST /api/auth/owner/register`: Register new shop owner
- `POST /api/auth/owner/login`: Shop owner login

## 🛒 Product Management Routes

### Product Pages
- `GET /products/createproduct`: Page to create new product
- `GET /product/editproduct/:id`: Page to edit existing product
- `GET /product/deleteproduct/:id`: Confirmation page for product deletion

### Product APIs
- `POST /products/create`: Create new product
- `PUT /product/edit/:id`: Update product details
- `DELETE /product/deleteproduct/:productId`: Delete specific product

## 👥 Owner Dashboard Routes
- `GET /owners/products`: View all shop owner's products
- `GET /owners/orders`: View all orders
- `GET /owners/addproduct`: Page to add new products

## 📦 Data Models

### User Model
- Full Name
- Email
- Password
- Cart
- Contact Information
- Order History

### Shop Owner Model
- Full Name
- Email
- Password
- Shop Address
- Shops
- Contact Information

### Product Model
- Product Name
- Owner
- Price
- Quantity
- Description
- Category

### Shop Model
- Owner
- Owner Contact Number
- Owner Email
- Shop Name
- Shop Address

## 🛠️ Product Creation Requirements
- Product Name
- Price
- Quantity
- Category
- Description

## 🔍 Technology Stack
*(You would typically list your tech stack here, e.g., Node.js, Express, MongoDB, etc.)*

## 📌 Setup and Installation
*(Provide instructions for setting up the project locally)*

## 🤝 Contributing
*(Guidelines for contributing to the project)*

## 📄 License
*(Specify the project's license)*

---

**Note**: This is a template README. Replace placeholder sections with your specific project details, technology stack, and additional information.