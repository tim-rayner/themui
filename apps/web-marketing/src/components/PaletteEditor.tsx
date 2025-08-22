'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Palette, Download, Refresh } from '@mui/icons-material';
import { Theme, createTheme } from '@mui/material/styles';
import { ExtractedColors, generateMuiTheme, exportTheme } from '../theme/themeGenerator';

interface PaletteEditorProps {
  initialColors: ExtractedColors;
  onThemeChange?: (theme: Theme) => void;
}

export function PaletteEditor({ initialColors, onThemeChange }: PaletteEditorProps) {
  const [colors, setColors] = useState<ExtractedColors>(initialColors);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    generateMuiTheme({ colors: initialColors })
  );

  const updateColor = useCallback((colorKey: keyof ExtractedColors, value: string) => {
    const newColors = { ...colors, [colorKey]: value };
    setColors(newColors);
    
    const newTheme = generateMuiTheme({ colors: newColors });
    setCurrentTheme(newTheme);
    onThemeChange?.(newTheme);
  }, [colors, onThemeChange]);

  const resetColors = useCallback(() => {
    setColors(initialColors);
    const resetTheme = generateMuiTheme({ colors: initialColors });
    setCurrentTheme(resetTheme);
    onThemeChange?.(resetTheme);
  }, [initialColors, onThemeChange]);

  const downloadTheme = useCallback((format: 'json' | 'typescript') => {
    const themeCode = exportTheme(currentTheme, format);
    const blob = new Blob([themeCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme.${format === 'typescript' ? 'ts' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentTheme]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Palette sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" component="h2">
          Palette Editor
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Color Inputs */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Colors
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColorInput
              label="Primary"
              value={colors.primary}
              onChange={(value) => updateColor('primary', value)}
            />
            <ColorInput
              label="Secondary"
              value={colors.secondary}
              onChange={(value) => updateColor('secondary', value)}
            />
            <ColorInput
              label="Background"
              value={colors.background}
              onChange={(value) => updateColor('background', value)}
            />
            <ColorInput
              label="Surface"
              value={colors.surface}
              onChange={(value) => updateColor('surface', value)}
            />
            <ColorInput
              label="Text"
              value={colors.text}
              onChange={(value) => updateColor('text', value)}
            />
          </Box>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Card sx={{ backgroundColor: colors.background }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.primary,
                    color: getContrastColor(colors.primary),
                    mr: 1,
                    mb: 1,
                  }}
                >
                  Primary Button
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.secondary,
                    color: getContrastColor(colors.secondary),
                    mb: 1,
                  }}
                >
                  Secondary Button
                </Button>
              </Box>
              <Paper sx={{ p: 2, backgroundColor: colors.surface }}>
                <Typography
                  variant="h6"
                  sx={{ color: colors.text, mb: 1 }}
                >
                  Sample Card
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.text, opacity: 0.7 }}
                >
                  This is how your theme will look in practice.
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={resetColors}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => downloadTheme('json')}
        >
          Download JSON
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => downloadTheme('typescript')}
        >
          Download TypeScript
        </Button>
      </Box>
    </Paper>
  );
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          backgroundColor: value,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          cursor: 'pointer',
        }}
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'color';
          input.value = value;
          input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
          input.click();
        }}
      />
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        sx={{ flexGrow: 1 }}
        inputProps={{
          pattern: '^#[0-9A-Fa-f]{6}$',
        }}
      />
    </Box>
  );
}

// Helper function to determine contrast color
function getContrastColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

export default PaletteEditor;
