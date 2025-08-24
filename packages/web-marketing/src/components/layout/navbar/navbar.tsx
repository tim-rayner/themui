'use client';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../../../hooks/useSmoothScroll';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(document.documentElement.scrollTop > 50);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartCreating = () => {
    scrollToElement('file-upload-section');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: 'none',
        // Mobile-only blur and shadow effects on scroll
        '@media (max-width: 899px)': {
          ...(scrolled && {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }),
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 80 },
          px: { xs: 2, md: 4 },
          justifyContent: 'space-between',
          boxShadow: 'none',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            fontWeight: 700,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              color: '#ffd700',
              transform: 'scale(1.05)',
            },
          }}
        >
          Themui
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                borderColor: 'white',
                transform: 'translateY(-1px)',
              },
            }}
            variant="outlined"
            href="/auth?authType=sign-in"
          >
            Sign In
          </Button>

          <Button
            sx={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
              },
            }}
            variant="contained"
            onClick={handleStartCreating}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
