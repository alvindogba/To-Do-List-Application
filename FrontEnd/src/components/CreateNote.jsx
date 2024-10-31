// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Box, CssBaseline} from '@mui/material';
import api from '../services/api';
import Header from './header';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import '../styles/style.css';

function CreateNote() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
  };
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    deadline: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize navigat

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting note:', newNote); // Log the newNote data to check values
    try {
      const response = await api.post('/api/notes',  newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
        }
   
      } );
      console.log('Note created successfully:', response.data); // Log response to confirm successful creation
      setNewNote({ title: '', content: '', deadline: '' }); // Reset form fields
      navigate('/dashboard');  // Redirect to the dashboard route
    } catch (error) {
      console.error('Error creating note:', error);
      setErrorMessage('Failed to create note. Please try again.');
    }
  };

  return (

    <Container>
  
      <CssBaseline/>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* New Note Form */}
      <Box  component="form" onSubmit={handleNoteSubmit} sx={{height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem"}}>
        <Typography variant="h6">Create New Note</Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        
        <TextField
          label="Title"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Content"
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          required
        />
        <TextField
          label="Deadline"
          name="deadline"
          value={newNote.deadline}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create Note
        </Button>
      </Box>

    
    </Container> 
  );
}

export default CreateNote;

  

