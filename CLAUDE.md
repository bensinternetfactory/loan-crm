# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with TurboPack at http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

### Deployment
- This project is deployed on Vercel
- Pushes to main branch trigger automatic deployments
- Build command: `npm run build`
- Output directory: `.next`

## Architecture

This is a Next.js 15.4.5 application for a loans CRM system using the App Router architecture with TypeScript and Tailwind CSS v4.

### Key Technologies
- **Next.js 15.4.5** with App Router and TurboPack
- **React 19.1.0** 
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with PostCSS
- **Clerk** for authentication and user management
- **ESLint** with Next.js recommended configuration
- **Vercel** for hosting and deployment

### Project Structure
- `/app` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
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

### Vercel Deployment Notes
- Environment variables should be configured in Vercel dashboard
- Clerk environment variables must be added to Vercel project settings
- API routes in `/app/api` are automatically deployed as serverless functions
- Static assets are automatically optimized and served from Vercel's CDN
- Next.js Image component is optimized for Vercel's image optimization