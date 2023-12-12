import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Historial from '/src/Historial.jsx';



const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;




