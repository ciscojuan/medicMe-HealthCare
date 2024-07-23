import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
);