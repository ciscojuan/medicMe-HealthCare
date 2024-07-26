import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import logoWithe from '../../assets/logoWhite.png';
import logoBlack from '../../assets/logoblack.png'
import avatar from '../../assets/header-img-p3.png'
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import './account.css';

const AccountManagement = () => {
    const navigate = useNavigate();
    const redirectTo =() =>{
        navigate("/")
    }
    return (
        <div className="user-panel">
            <Nav className="nav--purple" logo={logoBlack} />

            <div className="user-panel__container">

                <div className="sidebar__perfil">

                    <div className="perfil__title">
                        <h3>Informacion Personal</h3>
                    </div>

                    <div className="perfil__portrait">

                        <div className="perfil__portrait--image">
                            <img src={avatar} alt="Username" />
                        </div>

                        <div className="perfil__portrait--info">

                            <div className="info__name">
                                <p>Juan Perez Lozano</p>
                            </div>

                            <div className="perfil__rol">
                                <p>Paciente</p>
                            </div>

                            <div className="perfil__age">
                                <p>Edad: 40</p>
                            </div>

                            <div className="perfil__email">
                                <p>320 366 1206</p>
                            </div>

                            <div className="perfil__email">
                                <p>juan@mail.com</p>
                            </div>

                            <Button onClick={() => redirectTo()}>Cerrar sesion</Button>

                        </div>
                    </div>
                </div>

                <div className="sidebar__user-panel">

                    <div className="perfil__form">
                        
                        <div className="form__name">
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="nombre"
                                    type="text"
                                    placeholder="nombre"
                                />
                                <label htmlFor="nombre">Nombre </label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido"
                                />
                                <label htmlFor="apellido">Apellido</label>
                            </Form.Floating>
                        </div>

                        <div className="form__name">
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="telefono"
                                    type="text"
                                    placeholder="Telefono"
                                />
                                <label htmlFor="telefono">Telefono </label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="cumpleaños"
                                    type="date"
                                    placeholder="dd-mm-yyyy"
                                />
                                <label htmlFor="cumpleaños">Cumpleaños</label>
                            </Form.Floating>
                        </div>

                        <div className="form__direction">
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="direccion"
                                    type="text"
                                    placeholder="Direccion"
                                />
                                <label htmlFor="direccion">Direccion</label>
                            </Form.Floating>
                        </div>

                        <hr className="hr" />

                        <div className="form__name">
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    disabled
                                />
                                <label htmlFor="email">Email</label>
                            </Form.Floating>
                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="password"
                                    type="pasword"
                                    placeholder="Contraseña"
                                    disabled
                                />
                                <label htmlFor="password">Contraseña </label>
                            </Form.Floating>
                        </div>

                        <Form.Floating >
                            <Button variant="primary" size="lg" className="mt-2"> Guardar información</Button>
                        </Form.Floating>

                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccountManagement;