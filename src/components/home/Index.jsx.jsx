import React from 'react'
import './home.css';
import Button from '../../shared/button';
import KPI from './kpi';
import Rotulo from './Rotulo';

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
                    <Button text="Get Started" className="button--lg" />
                </div>
            </div>
            <KPI />
            <Rotulo />
        </div>
    )
}
export default Home;