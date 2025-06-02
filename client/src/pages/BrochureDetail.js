import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const BrochureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brochure, setBrochure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await axios.get(`/api/brochure/${id}`);
        setBrochure(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch brochure');
      } finally {
        setLoading(false);
      }
    };

    fetchBrochure();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!brochure) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/')}
          sx={{ textDecoration: 'none' }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/brochures')}
          sx={{ textDecoration: 'none' }}
        >
          Brochures
        </Link>
        <Typography color="text.primary">{brochure.companyName}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {brochure.companyName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Website: <a href={brochure.websiteUrl} target="_blank" rel="noopener noreferrer">
            {brochure.websiteUrl}
          </a>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Generated on: {new Date(brochure.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'background.default',
              '& img': { maxWidth: '100%', height: 'auto' },
              '& pre': { overflowX: 'auto' },
              '& code': { backgroundColor: 'rgba(0, 0, 0, 0.04)', p: 0.5, borderRadius: 1 }
            }}
          >
            <ReactMarkdown>{brochure.brochure}</ReactMarkdown>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};

export default BrochureDetail; 