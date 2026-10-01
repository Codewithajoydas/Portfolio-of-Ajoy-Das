# API Reference

This project exposes a small set of route handlers under `app/api` for portfolio and admin functionality.

## 1. Route Conventions

The app uses Next.js App Router route handlers. APIs are organized by feature and live in the `app/api` directory.

Examples:

- `/api/dashboard` — dashboard summary data
- `/api/signin` — admin sign in
- `/api/signup` — registration flow
- `/api/logout` — session cleanup
- `/api/me` — current authenticated user
- `/api/get-projects` — project list retrieval
- `/api/get-articles` — article list retrieval

## 2. Authentication

Protected routes use the JWT token stored in the `access_token` cookie.

Authentication is validated via `lib/auth.ts` using `jsonwebtoken`.

If a user is not authenticated, the request should return `401 Unauthorized`.

## 3. Dashboard Endpoint

### GET /api/dashboard

Returns the dashboard summary for the authenticated admin user.

#### Response

```json
{
  "success": true,
  "data": {
    "stats": {
      "projects": 12,
      "articles": 25,
      "published": 20,
      "drafts": 17
    },
    "contentOverview": {
      "projects": {
        "total": 12,
        "published": 9,
        "drafts": 3
      },
      "articles": {
        "total": 25,
        "published": 11,
        "drafts": 14
      }
    },
    "recentContent": [
      {
        "id": "...",
        "title": "Example Project",
        "type": "project",
        "status": "published",
        "updatedAt": "2026-10-01T12:00:00.000Z",
        "slug": "example-project"
      }
    ],
    "recentActivity": [
      {
        "id": "...",
        "title": "Project updated",
        "description": "Example Project was published",
        "type": "project",
        "timestamp": "2026-10-01T12:00:00.000Z"
      }
    ]
  }
}
```

#### Notes

- This route is server-side and requires authentication.
- It uses MongoDB counts and recent documents sorted by `updatedAt`.
- It does not expose any fake or static data.

## 4. Auth Routes

### POST /api/signin

Handles sign-in using credentials and sets a JWT cookie when authentication succeeds.

### POST /api/signup

Creates a new user account if validations pass.

### POST /api/logout

Removes the auth cookie and ends the session.

### GET /api/me

Returns the current authenticated user payload based on the active cookie.

## 5. Content Routes

### /api/get-projects

Returns a list of projects for the front end or admin flows.

### /api/get-articles

Returns a list of articles for the front end or admin flows.

## 6. Error Handling

API routes should generally:

- return a JSON error body for request failures
- use `401` for unauthorized access
- use `400` for validation issues
- use `500` for server/database failures

## 7. Best Practices

- Keep protected routes server-side and auth-checked
- Validate request bodies before DB writes
- Keep response contracts typed through `types/`
- Avoid mixing static mock data into production API responses
