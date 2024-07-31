import React, { useState, useEffect } from "react";
import { UilUserMd } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import login from "../../services/login";
import userService from "../../services/user";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logoWhite.png'
import './login.css';
import Notification from "../../shared/Notification";

const Login = () => {
   
    const navigate = useNavigate();

    const [email, setEmail] = useState([''])
    const [password, setPassword] = useState([''])

    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("userLogged");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
            userService.setToken(user.token); //paso el token a blogService de forma persistente
            console.log(user._id)
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`Email: ${email}, Password: ${password}`)
        try {
            const user = await login.auth({ email, password, })

            userService.setToken(user.token)

            window.localStorage.setItem("userLogged", JSON.stringify({token: user.token, id: user.id}));

            setUser(user)

            setEmail("")
            setPassword("")

            
            navigate("/user-panel")


        } catch (exception) {
            setErrorMessage("wrong credentials")
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        }

    };

    return (
        <div className="login">
            <div className="login__nav">
                <div className="login__nav--img">
                    <img src={logo} alt="MedicMe - HealthCare" />
                </div>
            </div>
            <div className="login__container">
                <div className="login__services">
                    <div className="login__service--icons">
                        <div className="service__icon">< UilUserMd size="80" color="#6D30ED" /></div>
                        <div className="service__icon">< UilCalendarAlt size="80" color="#6D30ED" /></div>
                        <div className="service__icon">< UilUserMd size="80" color="#6D30ED" /></div>
                    </div>
                    <div className="login__title">
                        <h2>Ingresa y comienza ahora</h2>
                    </div>
                    <div className="login__service--content">
                        <label >MedicMe, la innovadora aplicacion diseñada para simplificar tu vida y hacer el agendamiento de citas algo censillo.</label>
                    </div>
                </div>

                <div className="login__form">
                    <div className="login__form--container">

                        <div className="login__title">
                            <h2>Formulario de ingreso</h2>
                        </div>
                        <Notification messageError={errorMessage} message={message} />
                        <div className="login__form--content">
                            <form onSubmit={handleSubmit}>
                                <Form.Floating className="input__login">
                                    <Form.Control
                                        id="floatingInputCustom"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={({ target }) => setEmail(target.value)}
                                    />
                                    <label htmlFor="floatingInputCustom">Email address</label>
                                </Form.Floating>
                                <Form.Floating className="input__login">
                                    <Form.Control
                                        id="floatingPasswordCustom"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={({ target }) => setPassword(target.value)}
                                    />
                                    <label htmlFor="floatingPasswordCustom">Password</label>
                                </Form.Floating>
                                <div className="login__buton">
                                    <Button variant="primary" size="lg" type="submit" className="btn-login"> Ingresar</Button>

                                    <label>¿No tienes cuenta?</label> <Link to="/register">Creala  aca</Link>

                                </div>
                            </form>
                        </div>

                    </div>


                </div>
            </div>
            <div className="leftCircle"></div>
            <div className="RightCircle"></div>
            <div className="rightRectangle"></div>
        </div>
    )
}
export default Login;