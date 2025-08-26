# Authentication Setup Guide

Follow these steps to set up the Supabase authentication system for your Themui application.

## Step 1: Supabase Project Configuration

### 1.1 Enable Authentication Providers

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `xwegjrbvhhlezrvkrcxx`
3. Navigate to **Authentication** > **Providers**
4. Enable the following providers:
   - **Email** (already enabled)
   - **Google** (enable and configure)

### 1.2 Configure Google OAuth

1. In the Google provider settings, click **Configure**
2. You'll need to set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://xwegjrbvhhlezrvkrcxx.supabase.co/auth/v1/callback`
     - `http://localhost:3000/api/auth/callback` (for development)
3. Copy the Client ID and Client Secret to Supabase

### 1.3 Configure Site URL

1. Go to **Authentication** > **Settings**
2. Set **Site URL** to: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000/auth`
   - `http://localhost:3000/test`

## Step 2: Database Setup

### 2.1 Run Migration Script

1. Go to **SQL Editor** in your Supabase Dashboard
2. Copy the contents of `db/001_create_user_profiles.sql`
3. Paste and run the script
4. Verify the table and policies were created

### 2.2 Verify RLS Policies

1. Go to **Table Editor** > **user_profiles**
2. Check that RLS is enabled
3. Verify the policies are in place:
   - "Users can view own profile"
   - "Users can update own profile"
   - "Service role can insert profiles"
   - "Service role can update roles"

## Step 3: Environment Configuration

### 3.1 Create Environment File

The `.env.local` file has been created with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xwegjrbvhhlezrvkrcxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZWdqcmJ2aGhsZXpydmtyY3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTQyNTIsImV4cCI6MjA3MTY3MDI1Mn0.7iK40CONI6bzECTLjs_d0eQpE7e14ttNFDq_NymJj-M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZWdqcmJ2aGhsZXpydmtyY3h4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjA5NDI1MiwiZXhwIjoyMDcxNjcwMjUyfQ.b2WUzCuSiaXpI6oqH6ctIuTcwpfguFNruEMfaHiOVOo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## Step 4: Test the Implementation

### 4.1 Start Development Server

```bash
cd apps/web-marketing
pnpm dev
```

### 4.2 Test Authentication Flows

1. Visit `http://localhost:3000/test`
2. Test the following flows:
   - **Sign Up**: `/auth?authType=sign-up`
   - **Sign In**: `/auth?authType=sign-in`
   - **Magic Link**: Enter email and check for magic link
   - **Google OAuth**: Click "Continue with Google"

### 4.3 Test Role-Based Access

1. **Free Content**: `/test/free` (should work for all authenticated users)
2. **Paid Content**: `/test/paid` (should redirect to upgrade for free users)
3. **BYOK Content**: `/test/byok` (should redirect to upgrade for non-BYOK users)

## Step 5: Production Configuration

### 5.1 Update Environment Variables

For production, update your `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

### 5.2 Update Supabase Configuration

1. Update **Site URL** in Supabase to your production domain
2. Add production redirect URLs:
   - `https://your-domain.com/api/auth/callback`
   - `https://your-domain.com/auth/callback`

### 5.3 Google OAuth Production

1. Add production redirect URI to Google Cloud Console:
   - `https://your-domain.com/api/auth/callback`

## Step 6: Security Verification

### 6.1 Test Security Features

1. **Server-Side Checks**: Verify all auth checks happen server-side
2. **RLS Policies**: Test that users can only access their own data
3. **Session Management**: Verify sessions persist correctly
4. **Logout**: Test that logout clears sessions properly

### 6.2 Monitor Logs

1. Check Supabase logs for authentication events
2. Monitor application logs for errors
3. Verify no sensitive data is exposed in client-side code

## Troubleshooting

### Common Issues

1. **"Invalid redirect URL"**

   - Check that redirect URLs are properly configured in Supabase
   - Verify Google OAuth redirect URIs match exactly

2. **"Session not found"**

   - Check middleware configuration
   - Verify cookie settings
   - Ensure proper domain configuration

3. **"RLS policy violation"**
   - Check that user is properly authenticated
   - Verify RLS policies are correctly configured
   - Test with service role if needed

### Debug Steps

1. Check browser console for client-side errors
2. Check server logs for server-side errors
3. Verify environment variables are loaded correctly
4. Test with different browsers/devices

## Next Steps

After successful setup:

1. **Customize UI**: Update the authentication components to match your design
2. **Add Features**: Implement additional auth features (password reset, email verification)
3. **Integrate Payments**: Connect with Stripe for role upgrades
4. **Add Analytics**: Track authentication events and user behavior
5. **Monitor**: Set up monitoring and alerting for auth-related issues

## Support

If you encounter issues:

1. Check the [AUTH_IMPLEMENTATION.md](./AUTH_IMPLEMENTATION.md) for detailed documentation
2. Review Supabase authentication documentation
3. Check Next.js authentication best practices
4. Test with the provided test pages to isolate issues
