# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with TurboPack at http://localhost:3000
- `npx convex dev` - Start Convex development server (run in separate terminal)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

### Database (Convex)
- `npx convex dev` - Start Convex development server with live sync
- `npx convex deploy` - Deploy Convex functions to production
- `npx convex logs` - View function logs
- `npx convex dashboard` - Open Convex dashboard in browser
- `npx convex data` - Inspect database data

### Deployment
- This project is deployed on Vercel with Convex backend
- Pushes to main branch trigger automatic deployments
- Build command: `npm run build`
- Output directory: `.next`
- Convex production deployment: `npx convex deploy --prod`

## Architecture

This is a Next.js 15.4.5 application for a loans CRM system using the App Router architecture with TypeScript and Tailwind CSS v4.

### Key Technologies
- **Next.js 15.4.5** with App Router and TurboPack
- **React 19.1.0** 
- **TypeScript** with strict mode enabled
- **Convex** for real-time reactive database and backend functions
- **Tailwind CSS v4** with PostCSS
- **Clerk** for authentication and user management
- **ESLint** with Next.js recommended configuration
- **Vercel** for hosting and deployment

### Project Structure
- `/app` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
- `/convex` - Convex backend functions and schema
  - `schema.ts` - Database schema definitions
  - `_generated/` - Auto-generated Convex client code
  - Functions organized by feature (queries, mutations, actions)
- `/public` - Static assets (images, SVGs)
- Path alias configured: `@/*` maps to root directory

### TypeScript Configuration
- Strict mode enabled
- Module resolution: bundler
- Target: ES2017
- JSX: preserve
- Path aliases: `@/*` for absolute imports from root

### Styling
- Tailwind CSS v4 with PostCSS
- Geist and Geist Mono fonts from Google Fonts
- Dark mode support via Tailwind classes

### Authentication (Clerk)
- **Clerk** provides complete user management and authentication
- Configured for Next.js App Router with middleware protection
- Key components:
  - `ClerkProvider` wraps the application in `/app/layout.tsx`
  - `middleware.ts` handles route protection and authentication
  - Public routes can be configured in middleware
- Required environment variables:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
  - `CLERK_SECRET_KEY` - Clerk secret key (server-side only)
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Sign-in page URL (optional)
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Sign-up page URL (optional)
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - Redirect after sign-in (optional)
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Redirect after sign-up (optional)
- Authentication hooks:
  - `useAuth()` - Access auth state in client components
  - `useUser()` - Access current user data
  - `auth()` - Server-side authentication helper
  - `currentUser()` - Get user data in server components
- Protected routes are handled automatically via middleware

### Database (Convex)
- **Convex** provides real-time reactive database with TypeScript-first approach
- Serverless backend functions with automatic scaling
- Real-time subscriptions and reactive queries
- Built-in data validation and type safety

#### Core Concepts
- **Schema** - Defined in `/convex/schema.ts` with type-safe table definitions
- **Queries** - Read data from database with real-time subscriptions
- **Mutations** - Write data with ACID transactions
- **Actions** - Side effects like API calls, can call queries/mutations
- **HTTP Actions** - RESTful endpoints for webhooks and external integrations

#### Configuration
- **ConvexProvider** wraps the application for client access
- Required environment variables:
  - `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
  - `CONVEX_DEPLOY_KEY` - Deployment key (for CI/CD only)
- Development: Run `npx convex dev` alongside `npm run dev`
- Production: Deploy with `npx convex deploy --prod`

#### Client Usage
```typescript
// Use queries with real-time updates
const data = useQuery(api.loans.list);

// Execute mutations
const createLoan = useMutation(api.loans.create);
await createLoan({ amount: 10000, borrower: "John Doe" });

// Use actions for complex operations
const processApplication = useAction(api.loans.process);
```

#### Best Practices
- Keep functions small and focused
- Use schema validation for data integrity
- Leverage indexes for query performance
- Use transactions for data consistency
- Implement proper error handling in actions
- Use Convex Auth with Clerk for user context

#### File Organization
- Group related functions by feature (e.g., `loans.ts`, `customers.ts`)
- Share common types in `schema.ts` or dedicated type files
- Use helper functions for repeated logic
- Keep sensitive operations in mutations/actions, not queries

### Vercel Deployment Notes
- Environment variables should be configured in Vercel dashboard
- Clerk environment variables must be added to Vercel project settings
- Convex environment variables required:
  - `NEXT_PUBLIC_CONVEX_URL` - Set after initial Convex deployment
  - Connect Vercel project to Convex via dashboard for automatic deployments
- Deployment workflow:
  1. Deploy Convex backend: `npx convex deploy --prod`
  2. Deploy Next.js to Vercel (automatic on push to main)
  3. Convex functions are deployed separately from Vercel
- API routes in `/app/api` are automatically deployed as serverless functions
- Static assets are automatically optimized and served from Vercel's CDN
- Next.js Image component is optimized for Vercel's image optimization
- Convex handles its own scaling and infrastructure independently