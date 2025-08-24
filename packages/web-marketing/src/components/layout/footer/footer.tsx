import { GitHub } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import './footer.css';

export function Footer() {
  // Server-side rendered year - static for SSR consistency
  const currentYear = '2024';

  return (
    <Box
      component="footer"
      sx={{
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        py: { xs: 4, md: 6 },
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          {/* Brand Section */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '2 1 0%' },
              mb: { xs: 3, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                color: 'white',
                mb: 2,
                background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Themui
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              Transform your screenshots into beautiful MUI themes instantly.
              Professional design made simple for developers.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                component={Link}
                href="https://linkedin.com/in/tim-rayner"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  '&:hover': {
                    color: '#0077b5',
                    borderColor: '#0077b5',
                    background: 'rgba(0,119,181,0.1)',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://github.com/timrayner"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  '&:hover': {
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    background: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Box>

          {/* Product Links */}
          <Box sx={{ flex: { xs: '1 1 50%', md: '1 1 0%' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'white',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Product
            </Typography>
            <Stack spacing={1}>
              <Link href="/how-it-works" className="footer-link">
                How it Works
              </Link>
              <Link href="/pricing" className="footer-link">
                Pricing
              </Link>
              <Link href="/examples" className="footer-link">
                Examples
              </Link>
            </Stack>
          </Box>

          {/* Company Links */}
          <Box sx={{ flex: { xs: '1 1 50%', md: '1 1 0%' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'white',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" className="footer-link">
                About
              </Link>
              <Link href="/blog" className="footer-link">
                Blog
              </Link>
              <Link href="/careers" className="footer-link">
                Careers
              </Link>
            </Stack>
          </Box>

          {/* Support & Legal */}
          <Box sx={{ flex: { xs: '1 1 50%', md: '1 1 0%' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'white',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="/help" className="footer-link">
                Help Center
              </Link>
              <Link href="mailto:timr.codes@gmail.com" className="footer-link">
                Contact
              </Link>
              <Link href="/status" className="footer-link">
                Status
              </Link>
            </Stack>
          </Box>

          {/* Legal */}
          <Box sx={{ flex: { xs: '1 1 50%', md: '1 1 0%' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'white',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link href="/cookies" className="footer-link">
                Cookie Policy
              </Link>
            </Stack>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Divider
          sx={{
            my: 4,
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.85rem',
            }}
          >
            © {currentYear} Themui. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.85rem',
              }}
            >
              Made with ❤️ by{' '}
              <Link
                href="https://linkedin.com/in/tim-rayner"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-author-link"
              >
                Tim Rayner
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
