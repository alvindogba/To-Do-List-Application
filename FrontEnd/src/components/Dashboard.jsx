// Dashboard.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Box, CssBaseline, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../Styles/dashboard.css';
import '../Styles/sidebar.css';
import '../Styles/style.css';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notes, setNotes] = useState([]); // Store fetched notes
    const [errorMessage, setErrorMessage] = useState('');

    // Toggle the sidebar open and closed
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Fetch notes from the backend when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/api/notes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token to headers for authentication
                    },
                });
                setNotes(response.data); // Save notes in state
            } catch (error) {
                console.error('Error fetching notes:', error);
                setErrorMessage('Failed to load notes.');
            }
        };
        fetchNotes();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Box className="main-container" component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <div className="section_1">
                    <Typography variant="h4">Welcome to the Dashboard</Typography>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">Your Notes</Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {notes.length > 0 ? (
                                notes.map((note) => (
                                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                                        <Card sx={{ minHeight: 150 }}>
                                            <CardContent>
                                                <Typography variant="h6" component="div">
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Deadline: {note.deadline}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {note.content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">Edit</Button>
                                                <Button size="small" color="secondary">Delete</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <>
                                 <Typography>No notes found. </Typography>
                                <Button component={Link} to="/newNote">Create New Note</Button>
                                </>
                               

                            )}
                        </Grid>
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default Dashboard;
