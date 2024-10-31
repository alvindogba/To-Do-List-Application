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
    allowNull: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: true,
    index: true 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default Note;

