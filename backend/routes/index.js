import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { createNote, updateNote, deleteNote, getNotes } from '../controllers/noteController.js';
import authenticate from '../middleware/authenticate.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

// Auth routes
router.post('/auth/signup', upload.single('profilePic'), signup);
router.post('/auth/login', login);

// Note routes
router.get('/notes', authenticate, getNotes); // Protected: only authenticated users can view notes
router.post('/notes', authenticate, createNote); // Protected: only authenticated users can create notes
router.put('/notes/:id', authenticate, updateNote); // Protected: only authenticated users can update notes
router.delete('/notes/:id', authenticate, deleteNote); // Protected: only authenticated users can delete notes


//Dashboard
router.get('./dashboard ')
export default router;
