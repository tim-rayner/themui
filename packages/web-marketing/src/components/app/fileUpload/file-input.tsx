'use client';

import { alpha, Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadActions } from './upload-actions';
import { UploadIcon } from './upload-icons';
import { UploadSubtitle, UploadTitle } from './upload-text';

interface FileInputProps {
  onFileSelect?: (file: File) => void;
  onUploadComplete?: (fileUrl: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
  disabled?: boolean;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

export function FileInput({
  onFileSelect,
  onUploadComplete,
  onUploadError,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  disabled = false,
  uploadStatus: externalUploadStatus = 'idle',
  errorMessage: externalErrorMessage = '',
}: FileInputProps) {
  const theme = useTheme();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [internalUploadStatus, setInternalUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [internalErrorMessage, setInternalErrorMessage] = useState<string>('');

  // Use external status if provided, otherwise use internal state
  const uploadStatus =
    externalUploadStatus !== 'idle'
      ? externalUploadStatus
      : internalUploadStatus;
  const errorMessage = externalErrorMessage || internalErrorMessage;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        setInternalUploadStatus('error');
        setInternalErrorMessage(error.message);
        onUploadError?.(error.message);
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setInternalUploadStatus('uploading');
        setInternalErrorMessage('');
        onFileSelect?.(file);

        // Simulate local upload success after a short delay
        setTimeout(() => {
          setInternalUploadStatus('success');
          onUploadComplete?.(URL.createObjectURL(file));
        }, 1000);
      }
    },
    [onFileSelect, onUploadError, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes.reduce(
        (acc, type) => ({ ...acc, [type]: [] }),
        {}
      ),
      maxSize: maxFileSize,
      multiple: false,
      disabled: disabled || uploadStatus === 'uploading',
    });

  const handleReset = useCallback(() => {
    setUploadedFile(null);
    setInternalUploadStatus('idle');
    setInternalErrorMessage('');
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Paper
        {...getRootProps()}
        elevation={isDragActive ? 6 : 2}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor:
            disabled || uploadStatus === 'uploading'
              ? 'not-allowed'
              : 'pointer',
          border: 'dashed',
          borderWidth: 2,
          borderRadius: 3,
          borderColor: isDragActive
            ? theme.palette.primary.main
            : isDragReject
            ? theme.palette.error.main
            : alpha(theme.palette.primary.main, 0.3),
          backgroundColor: theme.palette.background.paper,
          background: '#ffffff',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden',

          '&:hover': {
            transform:
              disabled || uploadStatus === 'uploading'
                ? 'none'
                : 'translateY(-1px)',
            borderColor: isDragActive
              ? theme.palette.primary.main
              : alpha(theme.palette.primary.main, 0.5),
            boxShadow: isDragActive ? 8 : 4,
          },
          opacity: disabled || uploadStatus === 'uploading' ? 0.6 : 1,
        }}
      >
        <input {...getInputProps()} />

        <Stack spacing={2} alignItems="center" sx={{ minHeight: '320px' }}>
          <UploadIcon status={uploadStatus} />

          <UploadTitle status={uploadStatus} isDragActive={isDragActive} />

          <UploadSubtitle status={uploadStatus} errorMessage={errorMessage} />

          <UploadActions
            status={uploadStatus}
            uploadedFile={uploadedFile}
            errorMessage={errorMessage}
            disabled={disabled}
            onFileSelect={onFileSelect}
            onReset={handleReset}
          />

          {!uploadedFile && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: '#1a1a1a', // High contrast dark text
                  opacity: 0.9, // High opacity for better readability
                  '& strong': {
                    fontWeight: 600,
                  },
                }}
              >
                <strong>Supported formats:</strong> JPEG, PNG, WebP •{' '}
                <strong>Max size:</strong> {formatFileSize(maxFileSize)}
              </Typography>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
