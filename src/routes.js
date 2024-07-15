import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from './components/home/Index.jsx';


const routes = [
    { path: '/home', element:<Home/> },
    { path: '*', element: <Navigate to='/' /> }
]

export default routes;