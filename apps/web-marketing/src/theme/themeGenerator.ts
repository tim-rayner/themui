import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// Color extraction interface (placeholder for future AI/algorithm integration)
export interface ExtractedColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
}

// Theme generation options
export interface ThemeGenerationOptions {
  colors: ExtractedColors;
  typography?: {
    fontFamily?: string;
    scale?: 'compact' | 'normal' | 'comfortable';
  };
  shape?: {
    borderRadius?: number;
  };
  density?: 'compact' | 'standard' | 'comfortable';
}

/**
 * Generates a complete MUI theme from extracted colors
 * This is the core function that will be called by the generation pipeline
 */
export function generateMuiTheme(options: ThemeGenerationOptions): Theme {
  const { colors, typography = {}, shape = {}, density = 'standard' } = options;

  // Calculate contrast ratios and ensure accessibility
  const palette = {
    primary: {
      main: colors.primary,
      contrastText: getContrastText(colors.primary),
    },
    secondary: {
      main: colors.secondary,
      contrastText: getContrastText(colors.secondary),
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: adjustOpacity(colors.text, 0.7),
    },
  };

  // Typography configuration based on scale
  const typographyConfig = {
    fontFamily: typography.fontFamily || [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    ...getTypographyScale(typography.scale || 'normal'),
  };

  // Shape configuration
  const shapeConfig = {
    borderRadius: shape.borderRadius || 8,
  };

  // Spacing based on density
  const spacing = density === 'compact' ? 6 : density === 'comfortable' ? 10 : 8;

  const themeOptions: ThemeOptions = {
    palette,
    typography: typographyConfig,
    shape: shapeConfig,
    spacing,
    components: getComponentOverrides(density),
  };

  return createTheme(themeOptions);
}

/**
 * Extracts colors from an image (placeholder for actual implementation)
 * In the MVP, this will use a non-AI algorithm like MMCQ or color-thief
 */
export async function extractColorsFromImage(imageUrl: string): Promise<ExtractedColors> {
  // TODO: Implement actual color extraction
  // For now, return a sample palette
  return {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#fafafa',
    surface: '#ffffff',
    text: '#212121',
  };
}

/**
 * Converts a theme to exportable formats
 */
export function exportTheme(theme: Theme, format: 'json' | 'typescript' = 'json'): string {
  const themeObject = {
    palette: theme.palette,
    typography: theme.typography,
    shape: theme.shape,
    spacing: theme.spacing,
    components: theme.components,
  };

  if (format === 'typescript') {
    return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme(${JSON.stringify(themeObject, null, 2)});

export default theme;`;
  }

  return JSON.stringify(themeObject, null, 2);
}

// Helper functions

function getContrastText(backgroundColor: string): string {
  // Simple contrast calculation - in production, use a proper contrast ratio library
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

function adjustOpacity(color: string, opacity: number): string {
  // Convert hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getTypographyScale(scale: 'compact' | 'normal' | 'comfortable') {
  const scales = {
    compact: {
      h1: { fontSize: '2rem', lineHeight: 1.2 },
      h2: { fontSize: '1.75rem', lineHeight: 1.3 },
      h3: { fontSize: '1.5rem', lineHeight: 1.4 },
      h4: { fontSize: '1.25rem', lineHeight: 1.4 },
      h5: { fontSize: '1.125rem', lineHeight: 1.5 },
      h6: { fontSize: '1rem', lineHeight: 1.5 },
      body1: { fontSize: '0.875rem', lineHeight: 1.5 },
      body2: { fontSize: '0.75rem', lineHeight: 1.5 },
    },
    normal: {
      h1: { fontSize: '2.5rem', lineHeight: 1.2 },
      h2: { fontSize: '2rem', lineHeight: 1.3 },
      h3: { fontSize: '1.75rem', lineHeight: 1.4 },
      h4: { fontSize: '1.5rem', lineHeight: 1.4 },
      h5: { fontSize: '1.25rem', lineHeight: 1.5 },
      h6: { fontSize: '1rem', lineHeight: 1.5 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    },
    comfortable: {
      h1: { fontSize: '3rem', lineHeight: 1.2 },
      h2: { fontSize: '2.25rem', lineHeight: 1.3 },
      h3: { fontSize: '2rem', lineHeight: 1.4 },
      h4: { fontSize: '1.75rem', lineHeight: 1.4 },
      h5: { fontSize: '1.5rem', lineHeight: 1.5 },
      h6: { fontSize: '1.25rem', lineHeight: 1.5 },
      body1: { fontSize: '1.125rem', lineHeight: 1.7 },
      body2: { fontSize: '1rem', lineHeight: 1.7 },
    },
  };

  return scales[scale];
}

function getComponentOverrides(density: 'compact' | 'standard' | 'comfortable') {
  const paddingMap = {
    compact: { button: '6px 16px', card: 12 },
    standard: { button: '8px 22px', card: 16 },
    comfortable: { button: '12px 28px', card: 24 },
  };

  const padding = paddingMap[density];

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: padding.button,
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: padding.card,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  };
}
