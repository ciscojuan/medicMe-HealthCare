import React from 'react'
import { Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import UserPanel from './components/user-panel';
import AccountManagement from './components/account-mangement';
import NewDate from './components/new-date';
import ProtectedRoute from './shared/protectedRoutes/ProtectedRouted';



const routes = [
    { path: '/', element: <Home /> },
    { path: '/home', element:<Home/> },
    { path: '/login', element: <Login />},
    { path: '/register', element: <Register />},
    { path: '/user-panel', element: < ProtectedRoute element={< UserPanel />}  /> },
    { path: '/user-panel/:id?', element: < ProtectedRoute element={< UserPanel />}  /> },
    { path: '/user-management/:id?', element: <ProtectedRoute element={<AccountManagement />} />},
    { path: '/new-date', element: <ProtectedRoute element={<NewDate />} /> },
    { path: '*', element: <Navigate to='/' /> }
]

export default routes;