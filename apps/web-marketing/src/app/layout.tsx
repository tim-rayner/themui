import { Box } from '@mui/material';
import { Footer } from '../components/Footer';
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
            }}
          >
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
