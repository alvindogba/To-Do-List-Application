// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
    >
        <List className='side-bar-list-container'>
            <ListItem button onClick={toggleSidebar}>
                <ListItemText primary="Close" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Settings" />
            </ListItem>
        </List>
    </Drawer>
);

export default Sidebar;
