import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';

const BrochureList = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const response = await axios.get('/api/brochure');
        setBrochures(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch brochures');
      } finally {
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Generated Brochures
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {brochures.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No brochures generated yet. Start by creating one!
          </Typography>
        </Paper>
      ) : (
        <Paper>
          <List>
            {brochures.map((brochure, index) => (
              <React.Fragment key={brochure._id}>
                <ListItem
                  button
                  component={RouterLink}
                  to={`/brochures/${brochure._id}`}
                >
                  <ListItemText
                    primary={brochure.companyName}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {brochure.websiteUrl}
                        </Typography>
                        <br />
                        {new Date(brochure.createdAt).toLocaleDateString()}
                      </>
                    }
                  />
                </ListItem>
                {index < brochures.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default BrochureList; 