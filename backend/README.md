# AJIO Clone — Backend API

Node + Express + MongoDB REST API.

## Setup

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run seed           # optional sample data
npm run dev
```

## Scripts

- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — start in production mode
- `npm run seed` — wipe and reseed the products collection

## Structure

```
backend/
├── config/        # db connection
├── controllers/   # route handlers
├── middleware/    # auth, validation, error handling
├── models/        # Mongoose schemas
├── routes/        # express routers
├── seed/          # sample data + seed script
├── utils/         # helpers (JWT)
├── app.js         # express app + middleware wiring
└── server.js      # entry point
```
