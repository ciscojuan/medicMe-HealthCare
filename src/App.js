import React from 'react';
import {Routes, Route } from 'react-router-dom';
import routes from './routes';
import './App.css';
import Home from './components/home'
import Login from './components/login';

function App() {
  return (
    <Routes>
      {routes.map((route => (
        <Route key={route.path} path={route.path} element={route.element} />
      )
    ))}
    </Routes>
  );
}

export default App;
