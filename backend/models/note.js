import { DataTypes } from 'sequelize';
import sequelize from '../database-config/data-base.js';

const Note = sequelize.define('note', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  content: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  deadline: { 
    type: DataTypes.DATE, 
    allowNull: true,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString() // Ensures deadline is not in the past
    }
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: true
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  indexes: [
    {
      fields: ['userId']
    }
  ]
});

export default Note;
