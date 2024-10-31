// database-config/data-base.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('to-dolist', 'postgres', '03399truth', {
  host: 'localhost',
  dialect: 'postgres',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Automatically syncs all models to the database, creating tables if they don't exist
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
