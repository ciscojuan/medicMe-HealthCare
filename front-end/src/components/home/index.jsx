import React from 'react'
import './home.css';
import KPI from './kpi';
import Rotulo from './Rotulo';
import Servcios from './services';
import Button from 'react-bootstrap/Button';
import Registro from './registro';
import Faq from './faq';
import Nav from '../../shared/nav';
import Footer from '../../shared/footer';
import Header from './header';

const Home = () => {

    return (
        <div>
            <Header />
            <KPI />
            <Rotulo />
            <Servcios />
            <Registro />
            <Faq />
            <Footer />
        </div>
    )
}
export default Home;