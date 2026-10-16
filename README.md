# Favorite Places

A Vue 3 app for saving favorite places on a map.

**Stack:** Vue 3, Vue Router, Vuex, Axios, Mapbox GL, Tailwind CSS, Vite.

## Requirements

Node.js `^22.18.0` or `>=24.12.0`.

## Setup

```sh
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable           | Description                  |
| ------------------ | ---------------------------- |
| `VITE_BACKEND_API` | Backend API base URL         |
| `VITE_MAP_TOKEN`   | Mapbox public access token   |

## Scripts

```sh
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # oxlint + eslint
npm run format   # prettier
```
