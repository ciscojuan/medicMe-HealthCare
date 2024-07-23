import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { UilFolderPlus } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'

import DatePicker from "react-datepicker";
import logo from '../../assets/logo.png';
import logoWithe from '../../assets/logoWhite.png';
import logoBlack from '../../assets/logoblack.png'
import avatar from '../../assets/header-img-p3.png'
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import 'react-datepicker/dist/react-datepicker.css';
import './new-date.css';
const NewDate = () => {

const [selectedDate, setSelectedDate] = useState(new Date());

const minDate = new Date(Date())

const handleDateChage = (date) => {
    setSelectedDate(date)
    date = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    console.log(date)
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
                        <img src={avatar} alt="Username" />
                    </div>

                    <div className="perfil__info">

                        <div className="info__name">
                            <p>Mombre: Juan Perez Lozano</p>
                        </div>

                        <div className="perfil__rol">
                            <p>Paciente</p>
                        </div>

                        <div className="perfil__age">
                            <p>Edad: 40</p>
                        </div>

                        <div className="perfil__email">
                            <p>Telefono: 320 366 1206</p>
                        </div>

                        <div className="perfil__email">
                            <p>Email: juan@mail.com</p>
                        </div>

                        <Button>Cerrar sesion</Button>

                    </div>
                </div>

                <div className="sidebar__user-panel">
                    <div className="perfil__title">
                        <h3>Citas Generales</h3>
                    </div>

                    <div className="user-panel__operation">
                        <div className="user-panel__operation--card">
                            <UilFolderPlus size="60" />
                            <p>Crear Cita</p>
                        </div>
                        <div className="user-panel__operation--card">
                            <UilCalender size="60" />
                            <p>Consultar Citas</p>
                        </div>
                    </div>

                    <div className="new-date__container">
                            <h2>Asignacion de citas médicas</h2>
                        <div className="perfil__form">
                            <div className="form__name mb-5">
                                <Form.Select size="lg" aria-label="Default select example">
                                    <option>Escoje una especialidad:</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Select size="lg" aria-label="Default select example">
                                    <option>Escoje el médico de tu preferencia:</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>

                            <div className="form__name">
                                <Form.Select size="lg" aria-label="Default select example">
                                    <option>Escoje la sede que mejor se adpate a ti:</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>

                            <hr className="hr" />
                            
                            <div className="new-date__calendar">
                            <div className="form__date">
                                <DatePicker
                                selected={selectedDate}
                                onChange={(handleDateChage)}
                                dateFormat={"DD-MM-YYYY"} />
                            </div>

                            <div className="form__date"></div>
                            </div>
                            <Form.Floating >
                                <Button variant="primary" size="lg" className="mt-2"> Guardar información</Button>
                            </Form.Floating>

                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewDate;