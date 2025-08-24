import { Container, Stack, Typography } from '@mui/material';

import { FileInput } from '../components/app/fileUpload/file-input';

export function StartApplicationSection() {
  return (
    <Stack
      id="file-upload-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 12, md: 10 }, // Add top padding for fixed navbar
      }}
      gap={7}
    >
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 1, mb: 4, gap: 2 }}
      >
        <Stack gap={2}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Transform Your Design Into Code
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Simply upload a screenshot of your design and we'll instantly create
            a professional MUI theme that matches your colors and style. No
            design skills required.
          </Typography>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <FileInput />
      </Container>
    </Stack>
  );
}
