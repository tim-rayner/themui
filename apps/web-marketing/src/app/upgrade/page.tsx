import { getSessionUser } from '@/lib/auth/utils';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default async function UpgradePage() {
  const user = await getSessionUser();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center">
        Upgrade Your Plan
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        align="center"
        color="text.secondary"
      >
        Unlock premium features and unlimited access
      </Typography>

      {user && (
        <Paper sx={{ p: 3, mb: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            Current plan: <strong>{user.role}</strong>
          </Typography>
        </Paper>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Free Plan */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Free
            </Typography>
            <Typography variant="h4" gutterBottom>
              $0
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Basic features for getting started
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2">
                Basic theme generation
              </Typography>
              <Typography component="li" variant="body2">
                1 generation per day
              </Typography>
              <Typography component="li" variant="body2">
                Standard support
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
                          <Button
                fullWidth
                variant="outlined"
                component={Link}
                href="/auth?authType=sign-in"
              >
                Get Started
              </Button>
          </CardActions>
        </Card>

        {/* Pro Plan */}
        <Card sx={{ border: '2px solid', borderColor: 'primary.main' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h4" gutterBottom>
              $9.99
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Everything you need for professional use
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2">
                Unlimited theme generation
              </Typography>
              <Typography component="li" variant="body2">
                Advanced customization
              </Typography>
              <Typography component="li" variant="body2">
                Priority support
              </Typography>
              <Typography component="li" variant="body2">
                Export to multiple formats
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
                          <Button
                fullWidth
                variant="contained"
                component={Link}
                href="/auth?authType=sign-in&priceId=pro_monthly"
              >
                Upgrade to Pro
              </Button>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Need a custom plan? Contact us for enterprise pricing.
        </Typography>
      </Box>
    </Box>
  );
}
