import './global.css';
import { ThemeProvider } from '../theme/ThemeProvider';

export const metadata = {
  title: 'Themui - Generate MUI Themes from Screenshots',
  description: 'Upload a screenshot and instantly get a usable Material UI theme. Fast, simple, and developer-friendly.',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
