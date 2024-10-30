import {DataTypes} from 'sequelize';
import {sequelize} from '../database-config/data-base.js'


const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  profilePic: { type: DataTypes.BLOB },
});

export default User;
