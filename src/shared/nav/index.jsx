import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import logoWhite from '../../assets/logoWhite.png'
import logoBlack from '../../assets/logoblack.png'
import './nav.css';


const Nav = ({className,logo}) => {

    return (

        <div className={className}>

            <div className="nav__logo">
                <img src={logo} alt="medicMe" />
            </div>

            <div className="nav__menu">
                <div className="nav__menu--link">
                    <Link to="/home" className="link active">Home</Link>
                    <Link to="/services" className="link">Services</Link>
                    <Link to="/company" className="link">Company</Link>
                    <Link to="/login" className="link">Doctors</Link>
                    <Link to="/contact-us" className="link">Contact us</Link>
                </div>
            </div>
            {!localStorage.getItem('username') &&
            <div className="nav__loginArea">
                 <Button className="btn-primary"> Ingresar</Button>
                <Button  className="btn-primary">Registrace</Button>
            </div>}
        </div>

    )
}
export default Nav;