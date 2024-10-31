// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import api from '../services/api';

function CreateNote() {
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    deadline: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (error) {
      console.error('Error creating note:', error);
      setErrorMessage('Failed to create note. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* New Note Form */}
      <Box component="form" onSubmit={handleNoteSubmit} sx={{ mb: 4 }}>
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

  

