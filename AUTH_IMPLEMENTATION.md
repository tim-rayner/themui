# Supabase Authentication Implementation

This document outlines the complete end-to-end Supabase authentication solution implemented for the Themui application.

## Overview

The authentication system is built with security-first principles, using server-side rendering and server actions to ensure all sensitive operations happen on the server. The system supports:

- **Magic Link Authentication** - Passwordless email-based authentication
- **Google OAuth** - Social authentication via Google
- **Role-Based Access Control** - FREE, PAID, and BYOK user roles
- **Server-Side Session Management** - All auth checks happen server-side
- **Automatic Profile Creation** - User profiles are created automatically on signup

## Architecture

### File Structure

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Client-side Supabase client
│   │   ├── server.ts          # Server-side Supabase client
│   │   └── middleware.ts      # Session management middleware
│   └── auth/
│       ├── types.ts           # TypeScript types and Zod schemas
│       ├── utils.ts           # Server-side auth utilities
│       └── actions.ts         # Server actions for auth operations
├── components/
│   └── auth/
│       ├── SignInForm.tsx     # Sign-in form component
│       ├── SignUpForm.tsx     # Sign-up form component
│       ├── UserProfile.tsx    # User profile display component
│       └── ProtectedRoute.tsx # Route protection component
├── app/
│   ├── auth/
│   │   ├── layout.tsx         # Auth pages layout
│   │   ├── signin/
│   │   │   └── page.tsx       # Sign-in page
│   │   └── signup/
│   │       └── page.tsx       # Sign-up page
│   ├── api/
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts   # OAuth callback handler
│   └── middleware.ts          # Next.js middleware
└── db/
    └── 001_create_user_profiles.sql  # Database migration
```

## Security Features

### 1. Server-Side Authentication

- All authentication checks happen on the server
- No sensitive auth logic exposed to the client
- Session management through secure HTTP-only cookies

### 2. Row Level Security (RLS)

- Database tables protected with RLS policies
- Users can only access their own data
- Service role required for admin operations

### 3. Input Validation

- All inputs validated with Zod schemas
- Type-safe authentication operations
- Protection against injection attacks

### 4. Secure Session Management

- Automatic session refresh via middleware
- Secure cookie handling
- CSRF protection through Supabase

## Database Schema

### User Profiles Table

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'FREE' CHECK (role IN ('FREE', 'PAID', 'BYOK')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RLS Policies

- **Select**: Users can only view their own profile
- **Update**: Users can update their own profile (except role)
- **Insert**: Only service role can create profiles
- **Role Updates**: Only service role can update user roles

## Authentication Flow

### 1. Magic Link Flow

1. User enters email on sign-in/sign-up page
2. Server action sends magic link via Supabase
3. User clicks link in email
4. Callback route exchanges code for session
5. User is redirected to appropriate page

### 2. Google OAuth Flow

1. User clicks "Continue with Google"
2. Client redirects to Google OAuth
3. Google redirects back to callback route
4. Callback route exchanges code for session
5. User is redirected to appropriate page

### 3. Session Management

1. Middleware runs on every request
2. Session is automatically refreshed
3. User data is fetched server-side
4. Protected routes check authentication

## Usage Examples

### Server-Side User Check

```typescript
import { getSessionUser } from '@/lib/auth/utils';

export default async function MyPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return <div>Welcome, {user.email}!</div>;
}
```

### Role-Based Access Control

```typescript
import { ProtectedRoute, PaidOnly } from '@/components/auth/ProtectedRoute'

// Basic protection
<ProtectedRoute>
  <PaidContent />
</ProtectedRoute>

// Role-specific protection
<PaidOnly>
  <PremiumContent />
</PaidOnly>
```

### Client-Side User Display

```typescript
import { UserProfile } from '@/components/auth/UserProfile';

export default function Header() {
  return (
    <header>
      <UserProfile />
    </header>
  );
}
```

## Environment Variables

Create a `.env.local` file in the app directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## Setup Instructions

### 1. Database Setup

Run the migration script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of db/001_create_user_profiles.sql
```

### 2. Supabase Configuration

1. Enable Google OAuth provider in Supabase Dashboard
2. Add your callback URL: `https://your-domain.com/api/auth/callback`
3. Configure Google OAuth credentials in Google Cloud Console

### 3. Environment Variables

1. Copy the `.env.local` template
2. Replace with your actual Supabase credentials
3. Update `NEXT_PUBLIC_SITE_URL` for production

### 4. Test the Implementation

1. Start the development server: `pnpm dev`
2. Visit `/test` to see the authentication system in action
3. Test sign-in/sign-up flows
4. Test role-based access control

## Security Best Practices

### 1. Never Trust Client-Side Data

- All authentication checks happen server-side
- Use server actions for all auth operations
- Validate all inputs with Zod schemas

### 2. Secure Session Management

- Use HTTP-only cookies for session storage
- Implement automatic session refresh
- Clear sessions on logout

### 3. Database Security

- Enable RLS on all user tables
- Use parameterized queries
- Limit service role usage

### 4. Error Handling

- Don't expose sensitive information in error messages
- Log errors server-side only
- Provide user-friendly error messages

## Troubleshooting

### Common Issues

1. **Session not persisting**

   - Check middleware configuration
   - Verify cookie settings
   - Ensure proper redirect URLs

2. **Google OAuth not working**

   - Verify callback URL in Supabase
   - Check Google Cloud Console configuration
   - Ensure proper redirect handling

3. **RLS policies blocking access**
   - Check user authentication status
   - Verify policy conditions
   - Test with service role if needed

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
SUPABASE_DEBUG=true
```

## Next Steps

### 1. Production Deployment

- Update environment variables for production
- Configure proper domain in Supabase
- Set up monitoring and logging

### 2. Additional Features

- Implement email verification
- Add password-based authentication
- Create admin dashboard for user management

### 3. Integration

- Connect with Stripe for payments
- Implement usage tracking
- Add analytics and monitoring

## Support

For issues or questions:

1. Check the Supabase documentation
2. Review the Next.js authentication guide
3. Test with the provided test pages
4. Check browser console and server logs
