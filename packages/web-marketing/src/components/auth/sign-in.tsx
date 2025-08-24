'use client';

import {
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface SignInProps {
  onSignIn?: (email: string, password: string) => void;
  onGoogleSignIn?: () => void;
  onGitHubSignIn?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
}

export function SignIn({
  onSignIn,
  onGoogleSignIn,
  onGitHubSignIn,
  onForgotPassword,
  loading = false,
  error,
}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn(email, password);
    }
  };

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 8;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 420,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background:
            'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
          borderRadius: 4,
          zIndex: -1,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header with trust signals */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            }}
          >
            <LockIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your account to continue
          </Typography>

          {/* Social proof */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Chip
              icon={<CheckCircleIcon />}
              label="Trusted by 10K+ users"
              size="small"
              sx={{
                background: 'rgba(76, 175, 80, 0.1)',
                color: 'success.main',
                fontWeight: 500,
              }}
            />
          </Stack>
        </Box>

        {/* Error display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Social login buttons */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={onGoogleSignIn}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              fontWeight: 500,
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
                background: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Continue with Google
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={onGitHubSignIn}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              fontWeight: 500,
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.24)',
                background: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Continue with GitHub
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            or continue with email
          </Typography>
        </Divider>

        {/* Email/Password form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color={emailFocused ? 'primary' : 'action'} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color={passwordFocused ? 'primary' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            {/* Password strength indicator */}
            {password && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: 'rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${Math.min((password.length / 8) * 100, 100)}%`,
                      background: isPasswordValid
                        ? 'linear-gradient(90deg, #4caf50, #8bc34a)'
                        : 'linear-gradient(90deg, #ff9800, #ff5722)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {isPasswordValid ? 'Strong' : 'Weak'}
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !isEmailValid || !isPasswordValid}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.38)',
                  boxShadow: 'none',
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </Box>

        {/* Footer actions */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            onClick={onForgotPassword}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Forgot your password?
          </Button>
        </Box>

        {/* Sign up link */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Button
              href={`/auth?authType=sign-up`}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  background: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
