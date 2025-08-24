'use client';

import {
  CloudUpload as CloudUploadIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { Box, CircularProgress, Fade, Grow, useTheme } from '@mui/material';

import { AnimatedCheckIcon } from '../../lottie/animated-check-icon';

// Consistent icon container size
const ICON_CONTAINER_SIZE = 100;

interface UploadIconProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
}

export function UploadIcon({ status }: UploadIconProps) {
  const theme = useTheme();

  switch (status) {
    case 'success':
      return (
        <AnimatedCheckIcon
          width={200}
          height={200}
          loop={false}
          autoplay={true}
        />
      );

    case 'error':
      return (
        <Grow in timeout={600}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: ICON_CONTAINER_SIZE,
              height: ICON_CONTAINER_SIZE,
            }}
          >
            <ErrorIcon
              color="error"
              sx={{
                fontSize: 56,
                filter: 'drop-shadow(0 2px 8px rgba(244, 67, 54, 0.3))',
              }}
            />
          </Box>
        </Grow>
      );

    case 'uploading':
      return (
        <Grow in timeout={600}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: ICON_CONTAINER_SIZE,
              height: ICON_CONTAINER_SIZE,
            }}
          >
            <CircularProgress
              size={56}
              thickness={4}
              sx={{
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 2px 8px rgba(25, 118, 210, 0.3))',
              }}
            />
          </Box>
        </Grow>
      );

    default: // idle
      return (
        <Fade in timeout={800}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: ICON_CONTAINER_SIZE,
              height: ICON_CONTAINER_SIZE,
            }}
          >
            <CloudUploadIcon
              sx={{
                fontSize: 56,
                color: theme.palette.primary.main,
                filter: 'drop-shadow(0 2px 8px rgba(25, 118, 210, 0.3))',
              }}
            />
          </Box>
        </Fade>
      );
  }
}
