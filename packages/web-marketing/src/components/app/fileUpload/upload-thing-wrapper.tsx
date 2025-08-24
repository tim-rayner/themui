'use client';

import { useDropzone } from '@uploadthing/react';
import { useState } from 'react';
import { FileInput } from './file-input';

interface UploadThingWrapperProps {
  onUploadComplete?: (fileUrl: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  disabled?: boolean;
  endpoint?: string;
}

export function UploadThingWrapper({
  onUploadComplete,
  onUploadError,
  maxFileSize = 5 * 1024 * 1024,
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  disabled = false,
  endpoint = 'imageUploader',
}: UploadThingWrapperProps) {
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { startUpload, isUploading } = useDropzone(endpoint, {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setUploadStatus('success');
        onUploadComplete?.(res[0].url);
      }
    },
    onUploadError: (error) => {
      setUploadStatus('error');
      const message = error.message || 'Upload failed';
      setErrorMessage(message);
      onUploadError?.(message);
    },
  });

  const handleFileSelect = async (file: File) => {
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      await startUpload([file]);
    } catch (error) {
      setUploadStatus('error');
      const message = 'Upload failed';
      setErrorMessage(message);
      onUploadError?.(message);
    }
  };

  return (
    <FileInput
      onFileSelect={handleFileSelect}
      onUploadComplete={onUploadComplete}
      onUploadError={onUploadError}
      maxFileSize={maxFileSize}
      acceptedFileTypes={acceptedFileTypes}
      disabled={disabled || isUploading}
      uploadStatus={isUploading ? 'uploading' : uploadStatus}
      errorMessage={errorMessage}
    />
  );
}
