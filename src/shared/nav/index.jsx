import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import Button from '../button';
import logo from '../../assets/logo.png';


const Nav = () => {

    return (

        <div className="nav">

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

            <div className="nav__loginArea">
                <Button text="Register" className="button" />
                <Button text='Login' className="button" />
            </div>
        </div>

    )
}
export default Nav;