# Testing Clerk + Convex Authentication

## Setup Complete!
The Clerk authentication has been successfully integrated with Convex. Here's what was configured:

### What Was Done:
1. **Environment Variables**: Added `CLERK_JWT_ISSUER_DOMAIN` to `.env.local`
2. **Convex Auth Config**: Created `auth.config.ts` to validate Clerk JWT tokens
3. **Database Schema**: Added `users` table and linked all tables to users via `userId`
4. **Provider Update**: Updated to use `ConvexProviderWithClerk` for automatic auth
5. **User Management**: Created functions to sync and manage users
6. **Authentication Checks**: All queries/mutations now check authentication
7. **User Sync**: Automatic sync of Clerk user data to Convex on login

## Testing Steps:

### 1. Start Both Servers
Open two terminal windows:

**Terminal 1 - Next.js:**
```bash
npm run dev
```

**Terminal 2 - Convex:**
```bash
npx convex dev
```

### 2. Test Authentication Flow
1. Navigate to http://localhost:3000
2. Click "Sign In" in the top right
3. Sign up or sign in with Clerk
4. You'll be redirected to `/dashboard`

### 3. Verify User Sync
On the dashboard, you should see:
- Your Clerk user information (name, email)
- Your Convex User ID (generated after first login)
- Initially empty accounts list

### 4. Test Data Creation
1. Click "Seed Database with Mock Data"
2. The seed function will:
   - Authenticate you via Clerk JWT
   - Create sample accounts linked to your user
   - Add contacts, opportunities, and pre-approvals
3. Data should appear immediately (real-time updates via Convex)

### 5. Verify User Isolation
- Each user's data is isolated
- Only accounts created by/for a user are visible to them
- Sign out and sign in with a different account to verify isolation

## Important Notes:
- The JWT issuer domain in `.env.local` must match your Clerk JWT template
- Ensure the JWT template in Clerk is named "convex" (do not rename)
- The Convex server must be running to handle authentication
- First login creates the user record in Convex automatically

## Troubleshooting:
- If auth fails, check that `CLERK_JWT_ISSUER_DOMAIN` matches your Clerk dashboard
- Ensure both servers (Next.js and Convex) are running
- Check browser console for any JWT validation errors
- Verify the Clerk JWT template is configured correctly