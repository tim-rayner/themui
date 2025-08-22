'use client';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(document.documentElement.scrollTop > 50);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 80 },
          px: { xs: 2, md: 4 },
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            fontWeight: 700,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: scrolled ? '#667eea' : 'white',
            textShadow: scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              color: scrolled ? '#764ba2' : '#ffd700',
              transform: 'scale(1.05)',
            },
          }}
        >
          Themui
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            sx={{
              color: scrolled ? '#667eea' : 'white',
              borderColor: scrolled ? '#667eea' : 'rgba(255,255,255,0.3)',
              textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: scrolled
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'rgba(255,255,255,0.1)',
                borderColor: scrolled ? '#764ba2' : 'white',
                transform: 'translateY(-1px)',
              },
            }}
            variant="outlined"
          >
            Sign In
          </Button>

          <Button
            sx={{
              background: scrolled
                ? 'linear-gradient(45deg, #667eea, #764ba2)'
                : 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              backdropFilter: scrolled ? 'none' : 'blur(10px)',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)',
              textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: scrolled
                  ? 'linear-gradient(45deg, #764ba2, #667eea)'
                  : 'rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
                boxShadow: scrolled
                  ? '0 8px 25px rgba(102, 126, 234, 0.3)'
                  : '0 4px 15px rgba(255,255,255,0.2)',
              },
            }}
            variant="contained"
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
