'use client';

import { useAuthType } from '@/utils/useAuthType';
import { Box } from '@mui/material';
import { SignIn, SignUp } from '@themui/web-marketing';

export default function AuthPage() {
  const authType = useAuthType();
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
        {authType === 'sign-in' ? <SignIn /> : <SignUp />}
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
