# AJIO Clone — Frontend

React (Vite) SPA with Tailwind CSS and Redux Toolkit.

## Setup

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

Make sure the backend is running (default `http://localhost:5000`).

## Scripts

- `npm run dev` — start dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build

## Structure

```
frontend/src/
├── app/           # redux store
├── components/    # shared UI (Navbar, Footer, ProductCard, ...)
├── features/      # redux slices (auth, cart, wishlist)
├── pages/         # route pages
├── services/      # axios API client
├── utils/         # helpers (formatting)
├── App.jsx        # routes
└── main.jsx       # entry point
```
