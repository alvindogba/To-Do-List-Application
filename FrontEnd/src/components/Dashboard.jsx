// Dashboard.js
import React, { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Box, CssBaseline } from '@mui/material';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Box className='main-container' component="main" sx={{ flexGrow: 1 }}>
                <div className='section_1'>
                  <h2>Welcome to the Dashboard</h2>
                  <p>Your main content goes here.</p>    
                </div>
              
            </Box>
        </Box>
    );
};

export default Dashboard;
