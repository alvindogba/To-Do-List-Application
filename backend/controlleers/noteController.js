import Note from '../models/note';

export const createNote = async (req, res) => {
  try {
    const { title, content, deadline } = req.body;
    const note = await Note.create({ title, content, deadline, userId: req.user.id });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, deadline } = req.body;
    const note = await Note.update({ title, content, deadline }, { where: { id, userId: req.user.id } });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
