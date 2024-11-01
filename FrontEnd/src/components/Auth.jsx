// src/components/Auth.js

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import SignUp from './SignUp';
import SignIn from './signIn';
import '../Styles/dashboard.css';
import '../Styles/sidebar.css';
import '../Styles/style.css';

function Auth() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Welcome
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Sign Up" />
        <Tab label="Login" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <SignUp />}
        {activeTab === 1 && <SignIn />}
      </Box>
    </Box>
  );
}

export default Auth;
