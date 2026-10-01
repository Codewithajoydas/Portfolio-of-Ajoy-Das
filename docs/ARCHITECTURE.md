# Architecture Overview

This project is a Next.js portfolio and admin dashboard for a developer portfolio. It combines a public-facing portfolio front end with authenticated admin workflows for managing projects and articles.

## 1. System Goals

- Present a personal developer portfolio to visitors.
- Showcase projects, articles, experience, and technical writing.
- Support admin-only content management.
- Store portfolio data in MongoDB.
- Keep the codebase simple, maintainable, and aligned with Next.js App Router conventions.

## 2. Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS
- Database: MongoDB via Mongoose
- Authentication: JWT stored in cookies
- Styling: Tailwind + custom component layer
- Validation: Zod
- Logging: custom local logger, disabled in production

## 3. High-Level Structure

```text
portfolio/
├── app/                  # App Router pages and route handlers
├── components/           # Reusable UI pieces
├── lib/                  # shared utilities and services
├── models/               # MongoDB schemas
├── validators/           # request validation schemas
├── types/                # TypeScript contracts
├── utils/                # generic helpers and logger
├── store/                # React context state
├── hooks/                # custom hooks
├── public/               # static files and assets
├── docs/                 # project documentation
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 4. Core Architecture Layers

### 4.1 App Router Layer

The `app/` directory contains both the public-facing pages and API endpoints.

Examples:
- `app/(app)/...` for portfolio pages
- `app/admin/...` for admin dashboard pages
- `app/api/...` for backend handlers

This keeps routes, views, and server logic colocated while still following a clean app structure.

### 4.2 UI Layer

The `components/` folder contains reusable UI primitives and page-level building blocks. Shared UI patterns live here so that pages stay focused on data and layout composition.

Examples:
- header/footer/navigation pieces
- project cards
- admin sidebar
- common UI primitives under `components/ui`

### 4.3 Data Layer

The data layer is centered around MongoDB models in `models/` and the DB connection utility in `lib/connectDb.ts`.

Important responsibilities:
- connect to MongoDB
- validate data using Mongoose schemas
- query and aggregate content for portfolio pages and dashboard stats

### 4.4 Authentication Layer

Authentication is handled by `lib/auth.ts`.

- Reads the `access_token` cookie from Next.js server request context
- Verifies it with JWT
- Returns a typed user payload when valid
- Returns `null` when the token is missing or invalid

This is used to protect admin pages and API routes.

### 4.5 State Layer

The `store/` directory holds app-level React context, especially for sidebar and auth context patterns. The project keeps a lightweight state model by using context rather than a large global store.

### 4.6 Validation Layer

The `validators/` folder contains request validation logic using Zod. This ensures incoming article, signup, signin, and project payloads are strongly validated before interacting with the database.

## 5. Runtime Flow

### Public Portfolio Flow

1. A visitor requests a route such as `/projects` or `/articles/[slug]`.
2. Next.js resolves the App Router page.
3. Server-side logic reads data from MongoDB or static content sources.
4. The page renders the portfolio experience.
5. Reusable components render cards, metadata, sections, and navigation.

### Admin Flow

1. A user signs in through an auth route.
2. A JWT is generated and stored in a cookie.
3. The admin page or API route calls `getAuthenticatedUser()`.
4. If authentication succeeds, the route performs the requested action.
5. MongoDB queries return the real project/article data for the dashboard.

### Dashboard Flow

The admin dashboard uses the API route `/api/dashboard`.

- Server verifies auth
- Connects to MongoDB
- Counts all items and published/draft values
- Aggregates recent project and article activity
- Returns one structured response payload to the client
- Client renders the UI without hardcoded values

## 6. Routing Model

The project intentionally uses the Next.js App Router structure:

- `app/(app)` for public portfolio routes
- `app/admin` for admin-only dashboard pages
- `app/api` for backend endpoints

This produces a clear separation between public content, admin operations, and API-driven logic.

## 7. Data Models

The project currently uses MongoDB models for:

- `Project`
- `Article`
- `User`

These schemas define shared fields such as:
- title/name
- slug
- published flag
- image and metadata values
- timestamps
- author or creator information

## 8. Logging and Local Safety

The project uses a custom logger instead of a production logger package. It is designed to be silent in production and to log only in local development.

This keeps local debugging useful without exposing noisy logs in production runtime.

## 9. Design Principles

This codebase follows a few practical principles:

- Keep pages readable and route-oriented
- Prefer reusable components over deeply nested page logic
- Use server-side API routes for protected data access
- Validate all inbound request payloads
- Keep security checks centralized in the auth layer
- Use MongoDB for content-backed data and app state storage

## 10. Risks and Constraints

- Admin routes rely on authentication cookies and `JWT_SECRET`.
- All database operations require a valid MongoDB connection string.
- The app depends on environment variables for local and production runtime behavior.
- Some legacy folders may remain if they still hold active logic; they should be reviewed on a per-project basis.

## 11. Recommended Future Improvements

- Split large page logic into feature-specific modules when needed
- Add a dedicated admin content management API layer
- Add request-level error monitoring and health checks
- Standardize naming and file boundaries across content-heavy routes
- Add tests for validators, auth checks, and dashboard data aggregation

## 12. Summary

This project is a Next.js portfolio platform with a MongoDB-backed content model, authenticated admin dashboard, and dynamic public-facing pages. The architecture is intentionally straightforward: routes for views, models for data, auth checks for protection, and a reusable component layer for UI consistency.
