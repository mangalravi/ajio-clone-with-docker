# AJIO Clone — Full Stack E-Commerce

A fashion & lifestyle e-commerce web app inspired by AJIO, built with the MERN stack. The project is split into two independent apps:

```
ajio-clone/
├── backend/    # Node + Express + MongoDB REST API
└── frontend/   # React (Vite) + Tailwind + Redux Toolkit SPA
```

## Features

- User authentication (register / login) with JWT and bcrypt
- Product catalog with categories, search, filters, sorting, and pagination
- Product detail pages with size/color selection and reviews
- Shopping cart (add, update quantity, remove)
- Wishlist
- Checkout with shipping address and order placement
- Order history with status tracking
- Responsive, AJIO-inspired UI

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, express-validator, helmet, morgan, cors

**Frontend:** React 18, Vite, React Router v6, Redux Toolkit, Axios, Tailwind CSS, React Icons, React Toastify

## Prerequisites

- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

## Getting Started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit values (Windows: copy .env.example .env)
npm run seed           # optional: populate sample products
npm run dev            # starts API on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # starts app on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## Environment Variables

### backend/.env

| Key            | Description                          |
| -------------- | ------------------------------------ |
| PORT           | API port (default 5000)              |
| NODE_ENV       | development / production             |
| MONGO_URI      | MongoDB connection string            |
| JWT_SECRET     | Secret for signing JWTs              |
| JWT_EXPIRES_IN | Token lifetime (e.g. 7d)             |
| CLIENT_URL     | Frontend origin for CORS             |

### frontend/.env

| Key          | Description                  |
| ------------ | ---------------------------- |
| VITE_API_URL | Backend API base URL (`/api`)|

## API Overview

| Method | Endpoint                   | Access  | Description            |
| ------ | -------------------------- | ------- | ---------------------- |
| POST   | /api/auth/register         | Public  | Register               |
| POST   | /api/auth/login            | Public  | Login                  |
| GET    | /api/auth/profile          | Private | Current user profile   |
| GET    | /api/products              | Public  | List products          |
| GET    | /api/products/featured     | Public  | Featured products      |
| GET    | /api/products/:id          | Public  | Product by id          |
| POST   | /api/products/:id/reviews  | Private | Add a review           |
| GET    | /api/cart                  | Private | Get cart               |
| POST   | /api/cart                  | Private | Add to cart            |
| PUT    | /api/cart/:itemId          | Private | Update cart item       |
| DELETE | /api/cart/:itemId          | Private | Remove cart item       |
| GET    | /api/wishlist              | Private | Get wishlist           |
| POST   | /api/wishlist/:productId   | Private | Add to wishlist        |
| DELETE | /api/wishlist/:productId   | Private | Remove from wishlist   |
| POST   | /api/orders                | Private | Place an order         |
| GET    | /api/orders/myorders       | Private | My orders              |
| GET    | /api/orders/:id            | Private | Order by id            |

## Notes

This is an educational project and not affiliated with AJIO. Product images are sourced from Unsplash for demo purposes.
