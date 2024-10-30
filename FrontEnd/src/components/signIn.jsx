import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// import axios from 'axios';

function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // call API to login
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
    <Typography variant="h4" component="h1" textAlign="center" >
      Log In
    </Typography>
    <TextField
      label="Username"
      name="username"
      required
      fullWidth
      sx={{backgroundColor: "white"}}
    />
   
    <TextField
      label="Password"
      type="password"
      name="password"
      required
      fullWidth
      sx={{backgroundColor: "white"}}
    />
    <Button type="submit" variant="contained" color="primary" fullWidth>
      Log In
    </Button>
 
  </Box>

  );
}
export default SignIn;
