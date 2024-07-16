import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './shared/nav';
import Footer from './shared/footer';
import routes from './routes';
import Home from './components/home';

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          {routes.map((route) => {
            <Route index={route.path} path={route.path} element={route.element} />
          })}
        </Routes>
        <Home />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
