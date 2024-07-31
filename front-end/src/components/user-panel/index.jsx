import React, { useState, useEffect} from "react";
import { UilFolderPlus } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilMapPin } from '@iconscout/react-unicons'
import { UilClockNine } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilTrash } from '@iconscout/react-unicons'
import { Button } from "react-bootstrap";
import moment from 'moment'

import logo from '../../assets/logo.png';
import logoWithe from '../../assets/logoWhite.png';
import logoBlack from '../../assets/logoblack.png'
import avatar from '../../assets/header-img-p3.png'
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import userService from "../../services/user";
import './user-panel.css';
import { Link, useNavigate } from "react-router-dom";


const UserPanel = () => {
    
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([])
    const [patient, setPatient] = useState([])


    useEffect(() => {
        userService.getBookings().then((res) => {
            setReservas(res.data); // Store fetched data in `blogs` state
            console.log(reservas)
        });
        const userLogged = JSON.parse(localStorage.getItem("userLogged")); //devuelvo el contenido de localS en formato JSON
        const userId = userLogged.id    
        console.log(userId)
        userService.getPatient(userId).then((res) => {
            console.log(res.data)
            setPatient(res.data)
        })
    }, []);

    const logOut = () => {
        window.localStorage.clear()
        navigate("/home")
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

                            <Button onClick={() => logOut()}>Cerrar sesion</Button>

                        </div>
                    </div>


                </div>

                <div className="sidebar__user-panel">
                    <div className="perfil__title">
                        <h3>Citas Generales</h3>
                    </div>

                    <div className="user-panel__operation">
                        <div className="user-panel__operation--card">
                            <UilFolderPlus size="60" />
                            <Link to="/new-date">Crear cita</Link>
                        </div>
                        <div className="user-panel__operation--card">
                            <UilCalender size="60" />
                            <p>Consultar Citas</p>
                        </div>
                    </div>

                    <div className="cards__container">
                        {reservas.map((booking) => {
                            const appointmentDate = moment(booking.appointment);

                            return (
                                <div className="card" key={booking.id}>
                                    <div className="card__status">
                                        <h4>Confirmado</h4>
                                        <h6>Día: {appointmentDate.format('DD')}</h6>
                                        <h6>Mes: {appointmentDate.format('MM')}</h6>
                                        <h6>Año: {appointmentDate.format('YYYY')}</h6>
                                        <h5>{appointmentDate.format('HH:mm')}</h5>
                                    </div>
                                    <div className="card__status-mobile">
                                        <h4>Confirmado</h4>
                                        <h4>
                                            {appointmentDate.format('dddd')} - {appointmentDate.format('DD/MM/YYYY')} - {appointmentDate.format('HH:mm')}
                                        </h4>
                                    </div>
                                    <div className="card__info">
                                        <div className="card__info--row">
                                            <div className="info-icon">
                                                <UilUser size="30" className="user" />
                                            </div>
                                            <div className="info__complement">
                                                {booking.medico_id.name} - {booking.medico_id.lastname}
                                            </div>
                                        </div>
                                        <div className="card__info--row">
                                            <div className="info-icon">
                                                <UilMapPin size="30" className="location" />
                                            </div>
                                            <div className="info__complement">
                                                {booking.sede_id.name} - {booking.sede_id.direction}
                                            </div>
                                        </div>
                                        <div className="card__info--row">
                                            <div className="info-icon">
                                                <UilClockNine size="30" className="time" />
                                            </div>
                                            <div className="info__complement">
                                                Duración de la cita: 20 Minutos
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card__operations">
                                        <UilRedo className="booking" size="30" />
                                        <UilTrash className="delete" size="30" />
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UserPanel;