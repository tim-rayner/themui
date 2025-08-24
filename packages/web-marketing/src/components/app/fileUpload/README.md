# File Upload Components

This directory contains beautiful, accessible file upload components for theme screenshots with drag and drop functionality and UploadThing integration.

## Components

### FileInput

A beautiful, accessible file upload component with drag and drop functionality.

**Features:**

- Drag and drop support
- File type validation (JPEG, PNG, WebP)
- File size validation (5MB default)
- Visual feedback for different states
- Material UI design system
- Fully accessible

**Props:**

```typescript
interface FileInputProps {
  onFileSelect?: (file: File) => void;
  onUploadComplete?: (fileUrl: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number; // in bytes, default: 5MB
  acceptedFileTypes?: string[]; // default: ['image/jpeg', 'image/png', 'image/webp']
  disabled?: boolean;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}
```

**Usage:**

```tsx
import { FileInput } from '@themui/web-marketing';

function MyComponent() {
  const handleFileSelect = (file: File) => {
    // Handle file selection
    console.log('Selected file:', file.name);
  };

  return (
    <FileInput
      onFileSelect={handleFileSelect}
      onUploadComplete={(url) => console.log('Upload complete:', url)}
      onUploadError={(error) => console.error('Upload error:', error)}
    />
  );
}
```

### UploadThingWrapper

A wrapper component that integrates the FileInput with UploadThing for direct cloud uploads.

**Features:**

- Direct UploadThing integration
- Automatic upload handling
- Progress tracking
- Error handling

**Props:**

```typescript
interface UploadThingWrapperProps {
  onUploadComplete?: (fileUrl: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  disabled?: boolean;
  endpoint?: string; // UploadThing endpoint name
}
```

**Usage:**

```tsx
import { UploadThingWrapper } from '@themui/web-marketing';

function MyComponent() {
  return (
    <UploadThingWrapper
      endpoint="imageUploader"
      onUploadComplete={(url) => console.log('Upload complete:', url)}
      onUploadError={(error) => console.error('Upload error:', error)}
    />
  );
}
```

### FileUploadDemo

A demo component showing both usage patterns.

## Setup Requirements

### Dependencies

The components require these dependencies:

- `@mui/material` and `@mui/icons-material`
- `react-dropzone`
- `@uploadthing/react` (for UploadThing integration)

### UploadThing Configuration

To use the UploadThingWrapper, you need to:

1. Set up UploadThing in your project
2. Configure your upload endpoints
3. Wrap your app with the UploadThing provider

Example setup:

```tsx
import { UploadThingProvider } from '@uploadthing/react';

function App() {
  return <UploadThingProvider>{/* Your app content */}</UploadThingProvider>;
}
```

## Design Features

- **Visual Feedback**: Different states (idle, dragging, uploading, success, error) have distinct visual indicators
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Responsive**: Works well on mobile and desktop
- **Customizable**: Easy to customize colors, sizes, and behavior through props
- **Error Handling**: Comprehensive error handling with user-friendly messages

## File Validation

The components validate:

- File type (JPEG, PNG, WebP)
- File size (5MB default, configurable)
- File presence (no empty uploads)

## Styling

The components use Material UI's theming system and can be customized through:

- Theme overrides
- Custom `sx` props
- CSS custom properties

## Browser Support

- Modern browsers with ES6+ support
- Drag and drop API support
- File API support
