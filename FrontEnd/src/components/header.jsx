// Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, TextField, InputAdornment } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '../Styles/dashboard.css';
import '../Styles/sidebar.css';
import '../Styles/style.css';

const Header = ({ toggleSidebar, onSearch }) => {
    return (
        <AppBar className='header' position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, paddingX: 2 }}>
            <Toolbar>
                {/* Sidebar Toggle Button */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleSidebar}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Dashboard Title */}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>

                {/* Search Bar */}
                <TextField
                    placeholder="Search notes..."
                    variant="outlined"
                    size="small"
                    onChange={(e) => onSearch(e.target.value)}
                    sx={{ width: 250, marginRight: 2, backgroundColor: 'white', borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Notification Icon */}
                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>

                {/* User Profile Picture */}
                <Avatar
                    alt="User Profile"
                    src=""
                    sx={{
                        width: 40,
                        height: 40,
                        cursor: 'pointer',
                        marginLeft: 2
                    }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
