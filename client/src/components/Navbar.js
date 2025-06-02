import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <DescriptionIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            AI Brochure Generator
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/brochures"
            >
              Brochures
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 