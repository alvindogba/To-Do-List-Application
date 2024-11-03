// Dashboard.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import EditNoteForm from './EditNote';
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
    const [editMode, setEditMode] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

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

    //DELETE NOTES:
    async function handleDelete(id) {
        try {
            await api.delete(`/api/notes/${id}`);
            console.log('Note deleted successfully');
            setNotes(notes.filter(note => note.id !== id)); // Update state to remove the deleted note
        } catch (error) {
            console.error('Error deleting note:', error);
            setErrorMessage('Failed to delete note.');
        }
    }

    // Open edit form for a selected note
    const handleEditClick = (note) => {
        setSelectedNote(note);
        setEditMode(true);
    };

    // Update note in the state after editing
    const handleSaveEdit = (updatedNote) => {
        setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
        setEditMode(false); // Close edit dialog
    };

    const handleSearch = (query) => {
        const filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        setNotes(filteredNotes);
    };
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
           <Header toggleSidebar={toggleSidebar} onSearch={handleSearch} />

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
                                                    Deadline: {new Date(note.deadline).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {note.content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => handleEditClick(note)}>Edit</Button>
                                                <Button 
                                                    onClick={() => handleDelete(note.id)}
                                                    size="small" 
                                                    color="secondary">
                                                    Delete
                                                </Button>
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

                {/* Edit Note Form */}
                {editMode && selectedNote && (
                    <EditNoteForm
                        open={editMode}
                        onClose={() => setEditMode(false)}
                        note={selectedNote}
                        onSave={handleSaveEdit}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
