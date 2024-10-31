// database-config/data-base.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to false if using self-signed certificates
    }
  } : {},
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    if (process.env.NODE_ENV !== 'production') {
      // Sync models only in non-production environments
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


export default sequelize;
