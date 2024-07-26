import React, { useState } from "react";
import { UilUserMd } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logoWhite.png'
import './register.css';

const Register = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="register">
            <div className="register__nav">
                <div className="register__nav--img">
                    <img src={logo} alt="MedicMe - HealthCare" />
                </div>

            </div>
            <div className="register__container">
                <div className="register__services">
                    <div className="register__service--icons">
                        <div className="service__icon">< UilUserMd size="80" color="#6D30ED" /></div>
                        <div className="service__icon">< UilCalendarAlt size="80" color="#6D30ED" /></div>
                        <div className="service__icon">< UilUserMd size="80" color="#6D30ED" /></div>
                    </div>
                    <div className="register__title">
                        <h2>Registrate y comienza ahora</h2>
                    </div>
                    <div className="register__service--content">
                        <label >MedicMe, la innovadora aplicacion diseñada para simplificar tu vida y hacer el agendamiento de citas algo censillo.</label>
                    </div>
                </div>

                <div className="register__form">

                    <div className="register__title">
                        <h2>Formulario de Registro</h2>
                    </div>

                    <div className="register__form--content">
                        <Form.Floating className="">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputCustom">Nombre</label>
                        </Form.Floating>
                        <Form.Floating className="">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Apellido</label>
                        </Form.Floating>
                        <Form.Floating className="">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputCustom">Email</label>
                        </Form.Floating>
                        <Form.Floating className="">
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Contraseña</label>
                        </Form.Floating>
                        <div className="register__buton">
                                <Button variant="primary" size="lg" className="btn-register"> Ingresar</Button>
                            <label>Ya tienes cuenta?</label> <Link to="/login">Ingresa aca</Link>
                        </div>

                    </div>

                </div>
            </div>
            <div className="leftCircle"></div>
            <div className="rightCircle"></div>
            <div className="rightRectangle"></div>
        </div>
    )
}
export default Register;