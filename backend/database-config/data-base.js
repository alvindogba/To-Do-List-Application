// database-config/data-base.js
import { Sequelize } from 'sequelize';
import config from '../config/config';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if NODE_ENV is set to production
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  dialect: 'postgres',
  logging: false,
  dialectOptions: env === 'production' ? {
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

    // You can remove the following sync for production if you don't want to alter tables automatically
    if (env !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
