'use client';

import { Fade, Typography, useTheme } from '@mui/material';

interface UploadTextProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  isDragActive?: boolean;
  errorMessage?: string;
}

export function UploadTitle({ status, isDragActive }: UploadTextProps) {
  const theme = useTheme();

  const getStatusText = () => {
    switch (status) {
      case 'success':
        return 'Upload Complete!';
      case 'error':
        return 'Upload failed';
      case 'uploading':
        return 'Processing your screenshot...';
      default:
        return isDragActive
          ? 'Drop your screenshot here'
          : "Welcome! Let's create your MUI theme";
    }
  };

  return (
    <Fade in timeout={status === 'success' ? 800 : 400}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          lineHeight: 1.3,
          color: theme.palette.text.primary,
          minHeight: '2rem', // Ensure consistent height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: status === 'success' ? 'slideInUp 0.6s ease-out' : 'none',
          '@keyframes slideInUp': {
            '0%': {
              transform: 'translateY(20px)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateY(0)',
              opacity: 1,
            },
          },
        }}
      >
        {getStatusText()}
      </Typography>
    </Fade>
  );
}

export function UploadSubtitle({ status, errorMessage }: UploadTextProps) {
  const theme = useTheme();

  const getSubText = () => {
    if (status === 'success') {
      return 'Ready to generate your custom MUI theme!';
    }
    if (status === 'error') {
      return errorMessage || 'An error occurred during upload';
    }
    if (status === 'uploading') {
      return 'Please wait while we analyze your screenshot and prepare for theme generation...';
    }
    return "Upload a screenshot of your design and we'll automatically generate a beautiful MUI theme with matching colors, typography, and spacing.";
  };

  return (
    <Fade in timeout={status === 'success' ? 1000 : 400}>
      <Typography
        variant="body1"
        sx={{
          maxWidth: 500,
          lineHeight: 1.6,
          fontWeight: 400,
          color: theme.palette.text.primary,
          opacity: 0.8,
          minHeight: '3.6rem', // Ensure consistent height (2-3 lines of text)
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          animation:
            status === 'success' ? 'slideInUp 0.6s ease-out 0.2s both' : 'none',
          '@keyframes slideInUp': {
            '0%': {
              transform: 'translateY(20px)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateY(0)',
              opacity: 1,
            },
          },
          margin: 0,
        }}
      >
        {getSubText()}
      </Typography>
    </Fade>
  );
}
