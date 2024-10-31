// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import CreateNote from './components/CreateNote';
import SignIn from './components/signIn';
import Dashboard from './components/Dashboard';
import './styles/dashboard.css';
import './styles/sidebar.css';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn/>}/>
        <Route  path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/newNote' element={<CreateNote />} />
       
      </Routes>
    </Router>
  );
}

export default App;
