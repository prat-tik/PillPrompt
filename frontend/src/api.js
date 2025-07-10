// src/api.js
import axios from 'axios';

// Set the baseURL to your backend server's address and port
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this if your backend runs elsewhere
  // You can add headers or credentials here if needed
});

export default API;
