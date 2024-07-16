import React from 'react'
import './home.css';
import KPI from './kpi';
import Rotulo from './Rotulo';
import Servcios from './services';
import Button from '../../shared/button';
import Registro from './registro';
import Faq from './faq';

const Home = () => {

    return (
        <div>
            <div className='header'>
                <div className="header__title">
                    <h1>Bienvenidos al servicio de <span>citas medicas</span></h1>
                </div>
                <div className="header__subtitle">
                    <p>Encuentra a los mejores médicos y reserva tus citas de manera facil y rapida.</p>
                </div>
                <div className="header__start">
                    <Button text="Get Started" className="button--lg-light" />
                </div>
            </div>
            <KPI />
            <Rotulo />
            <Servcios />
            <Registro />
            <Faq />
        </div>
    )
}
export default Home;