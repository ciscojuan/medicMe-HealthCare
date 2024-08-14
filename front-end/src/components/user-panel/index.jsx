import React, { useState, useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";


const UserPanel = () => {

    const navigate = useNavigate();

    const [reservas, setReservas] = useState([])
    const [user, setUser] = useState([])
    const idParams = useParams()
    
    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem("userLogged")); //devuelvo el contenido de localS en formato JSON
        
        const userId = userLogged.id
        
        userService.getUserFromCredential(userId).then((res) => {
            setUser(res.data)
        })
        
    }, []);

    useEffect(() => {
        if (user && user._id) {  // Ensure `user` is populated before fetching bookings
            userService.getBookings(user._id).then((res) => {
                setReservas(res.data); // Store fetched data in `reservas` state
            });
        }
    }, [user]);

    console.log(user)
    console.log(reservas)
    const logOut = () => {
        window.localStorage.clear()
        navigate("/home")
    }

    const getDate = (birthDate) => {

        const date = moment(birthDate);
        const today = moment();
        const age = today.diff(date, 'years');
        return age;
    }

    const deleteBooking = (id) => {
        // Show a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");

        // If the user confirms, proceed with the deletion
        if (confirmDelete) {
            userService.deleteBooking(id).then(() => {
                window.location.reload();
            });
        }
    };
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

                        
                            <div className="info__name">
                                <p>{user.name} {user.lastname}</p>
                            </div>

                            <div className="perfil__rol">
                                <p>{ user.credentials?.role }</p>
                            </div>

                            <div className="perfil__age">
                                <p>Edad: {getDate(user.birthdate)}</p>
                            </div>

                            <div className="perfil__email">
                                <p>{user.phone}</p>
                            </div>

                            <div className="perfil__email">
                                <p>{ user.credentials?.email }</p>
                            </div>

                            <Button onClick={() => logOut()}>Cerrar sesion</Button>

 
                    </div>


                </div>

                <div className="sidebar__user-panel">
                    <div className="perfil__title">
                        <h3>Citas Generales</h3>
                    </div>

                    

                    <div className="cards__container">
                        { reservas !== null ? reservas.map((booking) => {
                            const appointmentDate = moment(booking.appointment);

                            return (
                                <div className="card" key={booking.id}>
                                    <div className="card__status">
                                        <h4>Confirmado</h4>
                                        <h6>Día: {appointmentDate.format('DD')}</h6>
                                        <h6>Mes: {appointmentDate.format('MM')}</h6>
                                        <h6>Año: {appointmentDate.format('YYYY')}</h6>

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
                                                {booking.doctor_id?.name} - {booking.doctor_id?.lastname} 
                                            </div>
                                        </div>
                                        <div className="card__info--row">
                                            <div className="info-icon">
                                                <UilMapPin size="30" className="location" />
                                            </div>
                                            <div className="info__complement">
                                                <span className="location-name">{booking.sede_id?.name}</span> - {booking.sede_id?.direction}
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
                                        <UilRedo className="update" onClick={() => navigate(`/new-date/${booking._id}`)} size="30" />
                                        <UilTrash className="delete" onClick={() => deleteBooking(booking._id)} size="30" />
                                    </div>
                                </div>
                            ) 
                        }) : <p>No hay citas agendadas</p>}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UserPanel;