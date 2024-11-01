import Note from '../models/note.js';

// Function to validate note input
const validateNoteInput = (title, content) => {
  if (!title || !content) {
    throw new Error('Title and content are required.');
  }
};

export const getNotes = async (req, res) => {
  try {
    const userNotes = await Note.findAll({ where: { userId: req.user.id } }); // Fetch only notes for the authenticated user
    res.json(userNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, deadline } = req.body;
  

    // Validate input
    validateNoteInput(title, content);


    const newNote = await Note.create({ title, content, deadline, userId: req.user.id });
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(400).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, deadline } = req.body;

    // Validate input
    validateNoteInput(title, content);

    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.update({ title, content, deadline });
    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(400).json({ error: error.message });
  }
};
