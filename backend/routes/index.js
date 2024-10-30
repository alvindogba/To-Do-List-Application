import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import authenticate from '../middleware/authenticate.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

router.post('/auth/signup', upload.single('profilePic'), signup);
router.post('/auth/login', login);
router.post('/notes', authenticate, createNote);
router.put('/notes/:id', authenticate, updateNote);
router.delete('/notes/:id', authenticate, deleteNote);

export default router;
