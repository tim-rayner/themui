import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Themui
        </Typography>
        <Button color="inherit">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
}
