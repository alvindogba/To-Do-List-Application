// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';


const Sidebar = ({ isOpen, toggleSidebar }) => (
    <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile
        }}
        sx={{
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
    >
        <List className="side-bar-list-container">
            <ListItem button onClick={toggleSidebar}>
            <ClearIcon fontSize='large' color='warning'/>
            </ListItem>
            <Divider />
            
            {/* Sidebar Links */}
            <ListItem button component={Link} to="/dashboard" onClick={toggleSidebar}>
                <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button component={Link} to="/newNote" onClick={toggleSidebar}>
                <ListItemText primary="Create New Note" />
            </ListItem>
            <ListItem sx={{display: "flex", gap: "0.5em"}} button component={Link} to="/signin" onClick={toggleSidebar}>
                <LogoutIcon  />      <ListItemText primary="Log Out" />
            </ListItem>
       
        </List>
    </Drawer>
);

export default Sidebar;
