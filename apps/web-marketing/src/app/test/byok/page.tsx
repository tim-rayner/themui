import { ByokOnly } from '@/components/auth/ProtectedRoute';
import { Box, Paper, Typography } from '@mui/material';

export default function ByokContentPage() {
  return (
    <ByokOnly>
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          BYOK Content
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            This is BYOK (Bring Your Own Key) content that only BYOK users can
            access.
          </Typography>

          <Typography variant="body1">
            You have successfully accessed the BYOK tier content!
          </Typography>
        </Paper>
      </Box>
    </ByokOnly>
  );
}
