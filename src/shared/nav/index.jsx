import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
                    <Link to="/" className="link active">Home</Link>
                    <Link to="/" className="link">Services</Link>
                    <Link to="/" className="link">Company</Link>
                    <Link to="/" className="link">Doctors</Link>
                    <Link to="/" className="link">Contact us</Link>
                </div>
            </div>

            <div className="nav__loginArea">
                <Button text="Register" className="button" />
                <Button text={'Login'} className="button" />
            </div>
        </div>

    )
}
export default Nav;