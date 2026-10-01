# Deployment Guide

This project is intended to run as a Next.js application on a Node-compatible hosting provider, with MongoDB as the data source.

## 1. Recommended Platform

The project is well suited for deployment on:

- Vercel
- any Node.js-compatible host

## 2. Required Environment Variables

Set the following variables in production:

```env
MONGODB_URL=your-production-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret
NEXT_PUBLIC_SITE_URL=https://your-production-domain
```

## 3. Build and Runtime Requirements

- Node.js version compatible with the project
- MongoDB connectivity from the deployed environment
- proper security for the JWT secret

## 4. Production Build

```bash
npm install
npm run build
npm run start
```

## 5. Vercel Setup

For Vercel deployment:

1. Import the repo to Vercel.
2. Choose the project framework as Next.js.
3. Add environment variables in the Vercel dashboard.
4. Ensure the MongoDB connection is reachable from the hosting environment.
5. Deploy the project.

## 6. Security Considerations

- Never commit `.env` files to source control.
- Use a strong random `JWT_SECRET` in production.
- Restrict database access to the deployment environment.
- Keep admin routes protected by JWT validation and cookies.

## 7. Production Notes

- The custom logger is designed to stay silent in production.
- Metadata and sitemap generation should use the production site URL.
- Admin endpoints should only be available behind valid auth.

## 8. Post-Deployment Checks

After deployment, verify:

- homepage loads
- admin dashboard loads for authenticated user
- API routes respond correctly
- MongoDB-backed data appears without errors
- sitemap and metadata resolve correctly
