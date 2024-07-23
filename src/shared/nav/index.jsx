import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import logoWhite from '../../assets/logoWhite.png'
import logoBlack from '../../assets/logoblack.png'
import './nav.css';


const Nav = ({ className, logo }) => {
    const navigate = useNavigate();
    const redirectTo = (path) => {
        console.log(path)

        path === '/login' && navigate('/login')
        path === '/register' && navigate('/register')
    }

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
                    <Button
                        className="btn-primary"
                        onClick={() => redirectTo("/login")}> Ingresar</Button>
                    <Button
                        className="btn-primary"
                        onClick={() => redirectTo("/register")}>Registrace</Button>
                </div>}
        </div>

    )
}
export default Nav;