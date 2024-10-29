// server.js
import express from 'express';
import cors from 'cors'; // For Cross-Origin Resource Sharing
import { connectDB  } from './database-config/data-base.js'; // Import connectDB from database.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to the database
connectDB();

// Define your routes here
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
