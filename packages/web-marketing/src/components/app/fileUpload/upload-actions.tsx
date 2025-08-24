'use client';

import {
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  Refresh as ResetIcon,
} from '@mui/icons-material';
import { Alert, Box, Button, Chip, Stack, useTheme } from '@mui/material';

interface UploadActionsProps {
  status: 'idle' | 'uploading' | 'success' | 'error';
  uploadedFile?: File | null;
  errorMessage?: string;
  disabled?: boolean;
  onFileSelect?: (file: File) => void;
  onReset?: () => void;
}

export function UploadActions({
  status,
  uploadedFile,
  errorMessage,
  disabled,
  onFileSelect,
  onReset,
}: UploadActionsProps) {
  const theme = useTheme();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box
      sx={{
        minHeight: '6rem', // Ensure consistent height for action area
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      {/* File Info Chip */}
      {uploadedFile && (
        <Chip
          icon={<ImageIcon />}
          label={`${uploadedFile.name} (${formatFileSize(uploadedFile.size)})`}
          variant="outlined"
          color="primary"
          sx={{
            fontWeight: 500,
            '& .MuiChip-label': {
              px: 2,
            },
          }}
        />
      )}

      {/* Action Button - Only show in idle state */}
      {status === 'idle' && (
        <Button
          variant="contained"
          size="medium"
          startIcon={<CloudUploadIcon />}
          disabled={disabled}
          sx={{
            px: 3,
            py: 1,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
              transform: 'translateY(-1px)',
              backgroundColor: theme.palette.primary.dark,
            },
            transition: 'all 0.2s ease',
          }}
        >
          Choose Screenshot
        </Button>
      )}

      {/* Error Alert */}
      {status === 'error' && errorMessage && (
        <Alert
          severity="error"
          sx={{
            width: '100%',
            '& .MuiAlert-message': {
              fontWeight: 500,
            },
          }}
        >
          {errorMessage}
        </Alert>
      )}

      {/* Success Alert */}
      {status === 'success' && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          {onReset && (
            <Button
              variant="outlined"
              size="small"
              onClick={onReset}
              sx={{
                alignSelf: 'center',
                fontSize: '0.875rem',
              }}
              startIcon={<ResetIcon />}
            >
              Upload a different file
            </Button>
          )}
        </Stack>
      )}

      {/* Uploading State - Empty space to maintain height */}
      {status === 'uploading' && (
        <Box sx={{ height: '3rem' }} /> // Placeholder to maintain spacing
      )}
    </Box>
  );
}
