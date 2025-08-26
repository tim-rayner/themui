// UserProfile was removed; keep page functional without it
import { getSessionUser } from '@/lib/auth/utils';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';

export default async function TestPage() {
  const user = await getSessionUser();

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Authentication Test Page
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current User Status
        </Typography>

        {user ? (
          <Box>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body1">
              <strong>User ID:</strong> {user.id}
            </Typography>
            <Typography variant="body1">
              <strong>Created:</strong>{' '}
              {new Date(user.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            No user logged in
          </Typography>
        )}
      </Paper>

      {/* Authentication component demo removed */}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Navigation
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            component={Link}
            href="/auth?authType=sign-in"
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            component={Link}
            href="/auth?authType=sign-up"
          >
            Sign Up
          </Button>
          <Button variant="outlined" component={Link} href="/">
            Home
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Role-Based Access Test
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={Link}
            href="/test/free"
            color="primary"
          >
            Free Content
          </Button>
          <Button
            variant="contained"
            component={Link}
            href="/test/paid"
            color="secondary"
          >
            Paid Content
          </Button>
          <Button
            variant="contained"
            component={Link}
            href="/test/byok"
            color="warning"
          >
            BYOK Content
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
