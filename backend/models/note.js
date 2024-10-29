// DataBase Configuration
import { DataTypes } from 'sequelize';
import sequelize from '../database-config/data-base';

const Note = sequelize.define('Note', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  deadline: { type: DataTypes.DATE },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Note;
