import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from './components/home';


const routes = [
    { path: '/home', element:<Home/> },
    { path: '*', element: <Navigate to='/' /> }
]

export default routes;