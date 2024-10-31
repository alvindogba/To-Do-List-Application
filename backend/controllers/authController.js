import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const signup = async (req, res) => {
  try {
  
    const { username, email, password } = req.body;
    const profilePic = req.file ? req.file.buffer : null; // Access the profilePic from multer
    console.log( profilePic)


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic, // Save the profile picture in binary format
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Signup error:', error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};


const login = async (req, res) => {
  console.log('Login request body:', req.body);
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
          // Selectively return user data, omitting password
          const { id, username } = user; 
          res.json({ token, user: { id, username } });
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(400).json({ error: error.message });
  }
};

export{signup, login}
