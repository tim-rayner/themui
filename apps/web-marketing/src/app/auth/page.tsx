'use client';

import { signInWithMagicLink, signUpWithMagicLink } from '@/lib/auth/actions';
import { createClient } from '@/lib/supabase/client';
import { useAuthType } from '@/utils/useAuthType';
import { Box } from '@mui/material';
import { SignIn, SignUp } from '@themui/web-marketing';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AuthPage() {
  const authType = useAuthType();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get parameters from URL
  const redirectTo = searchParams.get('redirectTo');
  const priceId = searchParams.get('priceId');
  const discountCode = searchParams.get('discountCode');

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();

      const redirectUrl = new URL('/api/auth/callback', window.location.origin);

      // Add custom parameters to redirect URL
      if (redirectTo) {
        redirectUrl.searchParams.set('redirectTo', redirectTo);
      }
      if (priceId) {
        redirectUrl.searchParams.set('priceId', priceId);
      }
      if (discountCode) {
        redirectUrl.searchParams.set('discountCode', discountCode);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl.toString(),
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();

      const redirectUrl = new URL('/api/auth/callback', window.location.origin);

      // Add custom parameters to redirect URL
      if (redirectTo) {
        redirectUrl.searchParams.set('redirectTo', redirectTo);
      }
      if (priceId) {
        redirectUrl.searchParams.set('priceId', priceId);
      }
      if (discountCode) {
        redirectUrl.searchParams.set('discountCode', discountCode);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUrl.toString(),
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (email: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithMagicLink({
        email,
        redirectTo: redirectTo || undefined,
        priceId: priceId || undefined,
        discountCode: discountCode || undefined,
      });

      if (result.error) {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUpWithMagicLink({
        email,
        redirectTo: redirectTo ?? undefined,
        priceId: priceId ?? undefined,
        discountCode: discountCode ?? undefined,
      });

      if (result.error) {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2, sm: 3, md: 4 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating elements for visual interest */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: { xs: 60, sm: 100 },
          height: { xs: 60, sm: 100 },
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: { xs: 90, sm: 150 },
          height: { xs: 90, sm: 150 },
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 480 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {authType === 'sign-in' ? (
          <SignIn
            onSignIn={handleEmailAuth}
            onGoogleSignIn={handleGoogleAuth}
            onGitHubSignIn={handleGitHubAuth}
            loading={loading}
            error={error ?? undefined}
          />
        ) : (
          <SignUp
            onSignUp={handleSignUp}
            onGoogleSignUp={handleGoogleAuth}
            onGitHubSignUp={handleGitHubAuth}
            loading={loading}
            error={error ?? undefined}
          />
        )}
      </Box>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
}
