// DataBase Configuration

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a Sequelize instance and connect to PostgreSQL
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging; default: console.log
});

// Test the database connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if connection fails
  }
}

export { sequelize, connectDB };
