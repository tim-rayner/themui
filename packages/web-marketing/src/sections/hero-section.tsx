'use client';

//https://lottiefiles.com/free-animation/gradient-dots-background-ZMJEGnRfBP
// - loader: https://lottiefiles.com/free-animation/color-loader-9Lff5mjjT3
//https://lottiefiles.com/free-animation/color-palette-lottie-animation-eRkaMXSs8R

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { AnimatedPaintRoller } from '../components/lottie/animated-paint-roller';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export function HeroSection() {
  const { scrollToElement } = useSmoothScroll();

  const handleStartCreating = () => {
    scrollToElement('file-upload-section');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 12, md: 10 }, // Add top padding for fixed navbar
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          margin: '0 auto',
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 2 }}
          alignItems="center"
          sx={{ minHeight: '80vh' }}
        >
          {/* Left side - Content */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={4} sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Box>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3.5rem',
                      md: '4rem',
                      lg: '4.5rem',
                    },
                  }}
                >
                  Generate MUI Themes
                  <Box
                    component="span"
                    sx={{ display: 'block', color: '#ffd700' }}
                  >
                    from Screenshots
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                  }}
                >
                  Upload a screenshot and instantly get a beautiful,
                  production-ready Material UI theme.
                  <Box component="span" sx={{ display: 'block', mt: 1 }}>
                    Fast, simple, and developer-friendly.
                  </Box>
                </Typography>
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: { xs: 'center', lg: 'flex-start' } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStartCreating}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background:
                      'linear-gradient(135deg, #11cba8 0%, #0ea5e9 50%, #11cba8 100%)',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(17, 203, 168, 0.3)',
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transition: 'left 0.5s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow:
                        '0 12px 35px rgba(17, 203, 168, 0.4), 0 0 20px rgba(14, 165, 233, 0.2)',
                      background:
                        'linear-gradient(135deg, #0ea5e9 0%, #11cba8 50%, #0ea5e9 100%)',
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(0.98)',
                      boxShadow: '0 6px 20px rgba(17, 203, 168, 0.3)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Start for free
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn more
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Right side - Animation */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                alignItems: { xs: 'center', md: 'flex-end' },
                height: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '400px',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                  },
                }}
              >
                <AnimatedPaintRoller width={400} height={300} loop={false} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
