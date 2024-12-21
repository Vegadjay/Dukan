# 📦 SnapShop - Multi-Vendor E-Commerce Platform

## 🎯 Project Overview
SnapShop is a robust multi-vendor e-commerce platform designed to create a seamless marketplace where buyers and sellers can interact within a unified ecosystem. The platform empowers entrepreneurs to establish their online presence while providing shoppers with a diverse shopping experience.

## ✨ Core Features

### 🔐 User Management
- **Dual Authentication System**
  - Separate authentication flows for shoppers and shop owners
  - Secure session management and JWT-based authentication
  - Password encryption and security measures

### 🏪 Shop Management
- **Vendor Dashboard**
  - Comprehensive product management
  - Order tracking and fulfillment
  - Analytics and performance metrics
- **Shop Customization**
  - Personalized shop profiles
  - Brand identity management
  - Contact information and policies

### 🛍️ Shopping Experience
- **Product Discovery**
  - Advanced search and filtering
  - Category-based navigation
  - Featured products showcase
- **Shopping Cart**
  - Real-time cart management
  - Save for later functionality
  - Multi-vendor checkout

### 📊 Order Management
- **Order Processing**
  - Automated order confirmation
  - Status tracking and updates
  - Order history maintenance
- **Payment Integration**
  - Secure payment processing
  - Multiple payment methods
  - Transaction history

## 🛣️ API Routes

### Authentication Routes

#### User Authentication
```
GET    /auth/pages/users/loginpage     # User login page
GET    /auth/pages/users/registerpage  # User registration
POST   /api/auth/users/register        # Register API
POST   /api/auth/users/login           # Login API
POST   /api/auth/logout                # Logout endpoint
```

#### Owner Authentication
```
GET    /auth/pages/owner/loginpage     # Owner login page
GET    /auth/pages/owner/registerpage  # Owner registration
POST   /api/auth/owner/register        # Register API
POST   /api/auth/owner/login           # Login API
```

### Product Management
```
GET    /products/createproduct         # Create product page
GET    /product/editproduct/:id        # Edit product page
GET    /product/deleteproduct/:id      # Delete confirmation
GET    /product/product/:id            # Product details
GET    /product/payment/:id            # Payment confirmation
POST   /products/create                # Create product API
PUT    /product/edit/:id               # Update product API
DELETE /product/deleteproduct/:id      # Delete product API
```

### Dashboard Routes
```
GET    /owners/products                # Owner products view
GET    /owners/addshop                # Add new shop
GET    /owners/addproduct             # Add product page
GET    /users/shopdetails             # User dashboard
GET    /orders/shoporder/:shopName    # Shop orders view
```

## 📝 Data Models

### User Schema
```javascript
{
  fullName: String,
  email: String,
  password: String,
  cart: Array,
  contactInfo: {
    phone: String,
    address: String
  },
  orderHistory: Array
}
```

### Shop Owner Schema
```javascript
{
  fullName: String,
  email: String,
  password: String,
  shopAddress: String,
  shops: Array,
  contactInfo: {
    phone: String,
    email: String
  }
}
```

### Product Schema
```javascript
{
  name: String,
  owner: ObjectId,
  price: Number,
  quantity: Number,
  description: String,
  category: String,
  images: Array
}
```

### Shop Schema
```javascript
{
  owner: ObjectId,
  contactNumber: String,
  email: String,
  name: String,
  address: String,
  products: Array
}
```

## 🚀 Development

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/snapshop.git
cd snapshop
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development server
```bash
npm run dev
```

## 🤝 Contributing
We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support
For support, email support@snapshop.com or join our [Discord community](https://discord.gg/snapshop).