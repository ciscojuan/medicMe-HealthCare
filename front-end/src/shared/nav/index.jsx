import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import userService from '../../services/user';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import logoWhite from '../../assets/logoWhite.png'
import logoBlack from '../../assets/logoblack.png'
import './nav.css';


const Nav = ({ className, logo }) => {

    const navigate = useNavigate();
    const [user, setUser ]= useState([])
   
    const redirectTo = (path) => {

        console.log(path)

        path === '/login' && navigate('/login')
        path === '/register' && navigate('/register')

    }

    useEffect(() => {
        if(localStorage.getItem("userLogged")){
            
            const userLogged = JSON.parse(localStorage.getItem("userLogged")); //devuelvo el contenido de localS en formato JSON
    
            const id = userLogged?.id
    
            userService.getUserFromCredential(id).then((res) => {
                setUser(res.data)
            })
        }

    }, []);

    return (

        <div className={className}>

            <div className="nav__logo">
                <img src={logo} alt="medicMe" />
            </div>

            <input type="checkbox" name="" id="nav__checkbox" className="nav__checkbox" />
            <label for="nav__checkbox" className="nav__toggle">

                <svg className="menu" viewBox="0 0 448 512" width="100" title="bars">
                    <path
                        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                </svg>

                <svg className="close" viewBox="0 0 384 512" width="100" title="times">
                    <path
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />

                </svg>
            </label>

            <div className="nav__menu">
                <div className="nav__menu--link">
                    <Link to="/home" className="link active">Home</Link>
                    <Link to="/user-panel" className="link">Perfil</Link>
                    {localStorage.getItem('userLogged') &&
                        <Link to={`/user-management/${user._id}`} className="link">Actualizar Datos</Link>}
                    {localStorage.getItem('userLogged') &&
                        <Link to="/new-date" className="link">Agendar cita</Link>}
                </div>
            </div>
            {!localStorage.getItem('userLogged') &&
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