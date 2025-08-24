import { Box } from '@mui/material';
import { ThemeProvider } from '../theme/ThemeProvider';
import './global.css';

export const metadata = {
  title: 'Themui - Generate MUI Themes from Screenshots',
  description:
    'Upload a screenshot and instantly get a usable Material UI theme. Fast, simple, and developer-friendly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Box
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 20% 80%, rgba(97, 95, 217, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(11, 203, 168, 0.3) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0,
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
