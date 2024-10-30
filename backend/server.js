// server.js
import express from 'express';
import cors from 'cors'; // For Cross-Origin Resource Sharing
import { connectDB  } from './database-config/data-base.js'; // Import connectDB from database.js
import router from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use('/api', router); // All routes will be prefixed with /api


// Connect to the database
connectDB();


// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
