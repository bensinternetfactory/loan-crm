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

### Vercel Deployment Notes
- Environment variables should be configured in Vercel dashboard
- API routes in `/app/api` are automatically deployed as serverless functions
- Static assets are automatically optimized and served from Vercel's CDN
- Next.js Image component is optimized for Vercel's image optimization