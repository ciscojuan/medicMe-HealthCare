import React, { useState } from "react";
import { UilUserMd } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logoWhite.png'
import './login.css';

const Login = () => {

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
                        <h2>Registrate y comienza ahora</h2>
                    </div>
                    <div className="login__service--content">
                        <label >MedicMe, la innovadora aplicacion diseñada para simplificar tu vida y hacer el agendamiento de citas algo censillo.</label>
                    </div>
                </div>

                <div className="login__form">

                    <div className="login__title">
                        <h2>Formulario de ingreso</h2>
                    </div>

                    <div className="login__form--content">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPasswordCustom">Password</label>
                        </Form.Floating>
                        <Form.Floating>
                            <Button variant="primary" size="lg" className="mt-5"> Ingresar</Button>
                        </Form.Floating>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Login;