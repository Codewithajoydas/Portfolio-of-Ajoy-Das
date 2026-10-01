# Local Setup Guide

This guide explains how to set up the project locally for development.

## 1. Prerequisites

Before starting, make sure you have:

- Node.js 20+
- npm or pnpm
- MongoDB running locally or a MongoDB connection string
- Git

## 2. Clone the repository

```bash
git clone <repository-url>
cd portfolio_of_codewithajoydas
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file in the project root with the required values.

Example:

```env
MONGODB_URL=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Required variables

- `MONGODB_URL`: MongoDB connection string
- `JWT_SECRET`: secret used for signing and verifying JWTs
- `NEXT_PUBLIC_SITE_URL`: base site URL used in metadata and generated links

## 5. Run the application

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## 6. Admin access

To access protected admin routes, sign in through the app flow or existing auth routes. The application validates the JWT from the `access_token` cookie.

## 7. Database setup

Make sure MongoDB is running before the app loads data from the database. If the app cannot connect to MongoDB, database-backed pages and APIs will fail.

## 8. Common development workflows

### Run a type check

```bash
npx tsc --noEmit
```

### Run lint

```bash
npm run lint
```

### Create a production build

```bash
npm run build
```

### Run production server

```bash
npm run start
```

## 9. Notes

- The app expects a local or hosted MongoDB service.
- The logger is set to stay silent in production by default.
- The portfolio and admin pages assume a valid environment configuration.
