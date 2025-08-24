'use client';

import {
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface SignUpProps {
  onSignUp?: (name: string, email: string, password: string) => void;
  onGoogleSignUp?: () => void;
  onGitHubSignUp?: () => void;
  loading?: boolean;
  error?: string;
}

export function SignUp({
  onSignUp,
  onGoogleSignUp,
  onGitHubSignUp,
  loading = false,
  error,
}: SignUpProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignUp) {
      onSignUp(`${firstName} ${lastName}`.trim(), email, password);
    }
  };

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid =
    password === confirmPassword && confirmPassword.length > 0;
  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    acceptTerms;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 480,
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
            <StarIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Join thousands of users
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your account and start building beautiful themes
          </Typography>

          {/* Social proof and benefits */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 3 }}
            flexWrap="wrap"
          >
            <Chip
              icon={<CheckCircleIcon />}
              label="Free forever plan"
              size="small"
              sx={{
                background: 'rgba(76, 175, 80, 0.1)',
                color: 'success.main',
                fontWeight: 500,
              }}
            />
            <Chip
              icon={<CheckCircleIcon />}
              label="No credit card required"
              size="small"
              sx={{
                background: 'rgba(33, 150, 243, 0.1)',
                color: 'primary.main',
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

        {/* Social sign-up buttons */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={onGoogleSignUp}
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
            Sign up with Google
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={onGitHubSignUp}
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
            Sign up with GitHub
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            or create account with email
          </Typography>
        </Divider>

        {/* Registration form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Name fields */}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
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
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            </Stack>

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

            <TextField
              fullWidth
              label="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              error={confirmPassword.length > 0 && !isConfirmPasswordValid}
              helperText={
                confirmPassword.length > 0 && !isConfirmPasswordValid
                  ? 'Passwords do not match'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      color={confirmPasswordFocused ? 'primary' : 'action'}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

            {/* Terms and conditions */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Button
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                      p: 0,
                      minWidth: 'auto',
                      fontSize: 'inherit',
                      '&:hover': {
                        background: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                      p: 0,
                      minWidth: 'auto',
                      fontSize: 'inherit',
                      '&:hover': {
                        background: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Privacy Policy
                  </Button>
                </Typography>
              }
              sx={{ alignItems: 'flex-start', mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !isFormValid}
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
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </Stack>
        </Box>

        {/* Sign in link */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Button
              href={`/auth?authType=sign-in`}
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
              Sign in
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
