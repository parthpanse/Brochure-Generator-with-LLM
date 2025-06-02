import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/brochure/generate', formData);
      navigate(`/brochures/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate brochure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Generate Company Brochure
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Enter a company name and website URL to generate an AI-powered brochure
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="websiteUrl"
            label="Website URL"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            disabled={loading}
            placeholder="https://example.com"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Generating Brochure...
              </>
            ) : (
              'Generate Brochure'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home; 