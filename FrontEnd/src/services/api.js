// src/services/api.js
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();


// Create an Axios instance
const api = axios.create({
  baseURL: process.env.DB_URL
});



export default api;
