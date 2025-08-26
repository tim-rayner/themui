import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Box, Paper, Typography } from '@mui/material';

export default function FreeContentPage() {
  return (
    <ProtectedRoute requiredRole="FREE">
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Free Content
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            This is free content that all authenticated users can access.
          </Typography>

          <Typography variant="body1">
            You have successfully accessed the free tier content!
          </Typography>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
