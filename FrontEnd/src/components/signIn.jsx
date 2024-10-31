import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import '../styles/style.css';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      
      const response = await api.post('/api/auth/login', formData); // Adjust the endpoint according to your API
      alert('Login successful!'); // Optionally display a success message

      // Assuming your API responds with a token
      localStorage.setItem('token', response.data.token); // Store the token for future requests

      // Redirect to a protected route, like the dashboard
      navigate('/dashboard'); // Adjust this route as needed
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Log In
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        fullWidth
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        sx={{ backgroundColor: 'white' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Log In'}
      </Button>
    </Box>
  );
}

export default SignIn;
