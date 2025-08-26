import { PaidOnly } from '@/components/auth/ProtectedRoute';
import { Box, Paper, Typography } from '@mui/material';

export default function PaidContentPage() {
  return (
    <PaidOnly>
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Paid Content
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            This is premium content that only paid users can access.
          </Typography>

          <Typography variant="body1">
            You have successfully accessed the paid tier content!
          </Typography>
        </Paper>
      </Box>
    </PaidOnly>
  );
}
