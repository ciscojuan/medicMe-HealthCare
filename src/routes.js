import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/home/register';



const routes = [
    { path: '/', element: <Home /> },
    { path: '/home', element:<Home/> },
    { path: '/login', element: <Login />},
    { path: '/register', element: <Register />},
    { path: '*', element: <Navigate to='/' /> }
]

export default routes;