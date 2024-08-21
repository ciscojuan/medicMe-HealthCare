import React from "react";
import logo from '../../../assets/logo.png'
import Nav from "../../../shared/nav";
import imgCal from '../../../assets/header-img-calendar.png';
import avatar1 from '../../../assets/header-img-p1.png';
import avatar2 from '../../../assets/header-img-p2.png';
import avatar3 from '../../../assets/header-img-p3.png';
import imgGrid2 from '../../../assets/header-img-grid2.png';
import { Button } from "react-bootstrap";
import './header.css';
import '../../../shared/nav/nav.css';

const Header = () => {
    return (
        <>
            <Nav className="navv" logo={logo}/>
            <div className='header'>
            <div className="header__center">
                    <div className="header__title">
                        <h1>Bienvenidos al servicio de <span>citas medicas</span></h1>
                    </div>
                    <div className="header__subtitle">
                        <p>Encuentra a los mejores médicos y reserva tus citas de manera facil y rapida.</p>
                    </div>
                    <div className="header__start">
                        <Button size="lg" className="btn-primary">Empecemos</Button>
                    </div>
            </div>
            </div>
            <img src={imgCal} alt="#" className="imgCal" />
            <img src={avatar1} alt="#" className="avatar1" />
            <img src={avatar2} alt="" className="avatar2" />
            <img src={avatar3} alt="" className="avatar3" />
            <img src={imgGrid2} alt=""  className="imgGrid2" />
        </>
    )
}

export default Header;