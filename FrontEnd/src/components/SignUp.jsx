import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, profilePic: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous errors
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePic', formData.profilePic);

    try {
      const response = await api.post('/api/auth/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/signin'); // Redirect to Sign In page
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.'); // Display error message from server
    } finally {
      setLoading(false); // Stop loading
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
        Sign Up
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
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        sx={{ backgroundColor: "white" }}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        sx={{ backgroundColor: "white" }}
      />
      <input
        type="file"
        name="profilePic"
        accept="image/*" // Ensure only images can be selected
        onChange={handleChange}
        required
        style={{ marginTop: 16 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
    </Box>
  );
}

export default SignUp;
