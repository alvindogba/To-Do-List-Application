// EditNoteForm.js
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../services/api';

const EditNoteForm = ({ open, onClose, note, onSave }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [deadline, setDeadline] = useState(note.deadline);

    const handleSave = async () => {
        try {
            // Call API to update the note
            await api.put(`/api/notes/${note.id}`, { title, content, deadline });
            onSave({ ...note, title, content, deadline }); // Pass updated note to parent
            onClose(); // Close dialog after save
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    label="Deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditNoteForm;
