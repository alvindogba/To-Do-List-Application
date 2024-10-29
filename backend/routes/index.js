import express from 'express';
import { signup, login } from '../controlleers/authController';
import { createNote, updateNote, deleteNote } from '../controlleers/noteController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/notes', authenticate, createNote);
router.put('/notes/:id', authenticate, updateNote);
router.delete('/notes/:id', authenticate, deleteNote);

export default router;
