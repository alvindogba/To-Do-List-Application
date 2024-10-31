// server.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './database-config/data-base.js'; // Import connectDB
import router from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use('/api', router); // All routes prefixed with /api
app.use('/uploads', express.static('uploads')); // Serve files from the uploads directory


// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
