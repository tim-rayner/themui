'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import {
  CloudUpload,
  Link as LinkIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

interface UploadWidgetProps {
  onUpload?: (file: File | string) => void;
  onUploadComplete?: (fileUrl: string) => void;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

export function UploadWidget({
  onUpload,
  onUploadComplete,
  maxFileSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: UploadWidgetProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [urlInput, setUrlInput] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`File type not supported. Please upload: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File too large. Maximum size: ${maxFileSize}MB`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    onUpload?.(file);

    // Simulate upload progress (replace with actual upload logic)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Simulate successful upload
          const mockUrl = URL.createObjectURL(file);
          onUploadComplete?.(mockUrl);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [acceptedTypes, maxFileSize, onUpload, onUploadComplete]);

  const handleUrlUpload = useCallback(() => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setError(null);
    setUploading(true);
    onUpload?.(urlInput);

    // Simulate URL processing
    setTimeout(() => {
      setUploading(false);
      onUploadComplete?.(urlInput);
    }, 1000);
  }, [urlInput, onUpload, onUploadComplete]);

  return (
    <Paper
      sx={{
        p: 4,
        border: 2,
        borderColor: dragActive ? 'primary.main' : 'divider',
        borderStyle: 'dashed',
        backgroundColor: dragActive ? 'action.hover' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab icon={<CloudUpload />} label="Upload File" />
          <Tab icon={<LinkIcon />} label="From URL" />
        </Tabs>

        {tabValue === 0 && (
          <>
            <CloudUpload
              sx={{
                fontSize: 64,
                color: dragActive ? 'primary.main' : 'text.secondary',
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              {dragActive ? 'Drop your screenshot here' : 'Upload a screenshot'}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Drag & drop your image here, or click to browse
            </Typography>
            <input
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<ImageIcon />}
                disabled={uploading}
              >
                Choose File
              </Button>
            </label>
          </>
        )}

        {tabValue === 1 && (
          <>
            <LinkIcon
              sx={{
                fontSize: 64,
                color: 'text.secondary',
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              Upload from URL
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Paste a link to your screenshot
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, maxWidth: 400, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="https://example.com/screenshot.png"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                disabled={uploading}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleUrlUpload}
                disabled={uploading || !urlInput.trim()}
              >
                Upload
              </Button>
            </Box>
          </>
        )}

        {uploading && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Uploading... {uploadProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Supported formats: JPG, PNG, WebP • Max size: {maxFileSize}MB
        </Typography>
      </Box>
    </Paper>
  );
}

export default UploadWidget;
