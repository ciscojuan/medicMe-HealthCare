import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from "react-router-dom";
import { UilFolderPlus } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'

import moment from 'moment';
import userService from "../../services/user";
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
    const navigate = useNavigate();
    const { id } = useParams()
    
    // Almacernar las fechas ya asignadas
    const [blockDates, setBlockDates] = useState([])
        
    const minDate = new Date(Date())
    
    const [user, setUser] = useState([])
    const [doctor, setDoctor] = useState([])
    const [specialty, setSpeciaity]=useState([])
    const [locations, setLocation] = useState([])
    //handle update data
    const [update, setUpdate] = useState(false)
    
    //estado para almacenar la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState('');
    const [specialtySelected, setSpecialtySelected] = useState('')
    const [locationSelected, setLocationSelected] = useState('')
    const [doctorSelected, setDoctorSelected] = useState('')
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filteredLocation, setFilteredLocation] = useState([])
    

    useEffect(() => {
        //guardar usuario del localstorage en el estado
        const userLogged = JSON.parse(localStorage.getItem('userLogged'));
        const id = userLogged.id
        userService.getUserFromCredential(id).then((res) => {
            setUser(res.data)
        })

        
        userService.getDoctors().then((res) => {
            setDoctor(res.data)
        })
        
        userService.getSpecialty().then((res) => {
            setSpeciaity(res.data)
        })

        userService.getLocations().then((res) => {
            setLocation(res.data)
        })

    }, [])

    useEffect(() => {
        if(user && user._id){

            userService.getAllBookings().then((res) => {
                const dates = res.data.map(booking => booking.appointment)
                setBlockDates(dates)
            })
        }
    }, [user])

    console.log(blockDates)
    const formatDates = blockDates.map(date => date.split('T')[0])
    console.log(formatDates)

    useEffect(() => {
        if (specialtySelected) {
            // Filtrar los doctores según la especialidad seleccionada
            const doctorFilter = doctor.filter(doctor => doctor.specialty._id === specialtySelected);
            setFilteredDoctors(doctorFilter);

            const locationFilter = locations.filter(location => location.specialty._id === specialtySelected);
            setFilteredLocation((locationFilter));
            

        } else {
            setFilteredDoctors([])
            setFilteredLocation([]);
        }
    }, [specialtySelected, doctor, locations]);
    

    useEffect(() =>{
        if(!id) return;
        setUpdate(true)
    }, [id])

    const handleDateChage = (date) => {
        date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        console.log(date)
        setSelectedDate(date)
    }


    // Función para comprobar si una fecha está bloqueada
    const isDateBlocked = (date) => {
        //date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        return formatDates.includes(date);
    };

    const handleSubmit = (e) => {
        if(update){
            try {
                e.preventDefault()

                const newData = {
                    paciente_id: user._id,
                    doctor_id: doctorSelected,
                    sede_id: locationSelected,
                    specialty_id: specialtySelected,
                    appointment: selectedDate,
                }

                setDoctorSelected('')
                setSpecialtySelected('')
                setLocationSelected('')
                setSelectedDate('')

                userService.updateBooking(id, newData)
                console.log(newData)
                navigate(`/user-panel`)
            } catch (err) {
                console.log(err)
            }
        }else{
            try {
                e.preventDefault()

                const newData = {
                    paciente_id: user._id,
                    doctor_id: doctorSelected,
                    sede_id: locationSelected,
                    specialty_id: specialtySelected,
                    appointment: selectedDate,
                }

                setDoctorSelected('')
                setSpecialtySelected('')
                setLocationSelected('')
                setSelectedDate('')

                userService.saveBooking(newData)
                console.log(newData)
                navigate(`/user-panel`)
            } catch (err) {
                console.log(err)
            }
        }
    }


    const getDate = (birthdate) => {
        const date = moment(birthdate);
        const today = moment();
        const age = today.diff(date, 'years');
        return age;
    }
    const logOut = () => {
        localStorage.clear();
        navigate("/home")
    }

    const isFormValid = () => {
        return (
            specialtySelected !== '' &&
            doctorSelected !== '' &&
            locationSelected !== '' &&
            selectedDate &&
            !isDateBlocked(selectedDate)
        );
    };

    return (
        <div className="user-panel">
            <Nav className="nav--purple" logo={logoBlack} />
            <div className="user-panel__container">
                <div className="sidebar__perfil--new-date">

                    <div className="perfil__title">
                        <h3>Informacion Personal</h3>
                    </div>

                    <div className="perfil__portrait--new-date">

                        <img src={avatar} alt="Username" />


                        <div className="info__name">
                            <p>{user.name} {user.lastname}</p>
                        </div>

                        <div className="perfil__rol">
                            <p>{user.credentials?.role}</p>
                        </div>

                        <div className="perfil__age">
                            <p>Edad: {getDate(user.birthdate)}</p>
                        </div>

                        <div className="perfil__email">
                            <p>{user.phone}</p>
                        </div>

                        <div className="perfil__email">
                            <p>{user.credentials?.email}</p>
                        </div>

                        <Button onClick={() => logOut()}>Cerrar sesion</Button>
                    </div>


                </div>

                <div className="sidebar__user-panel">

                    <div className="new-date__container">
                        <h2>Asignacion de citas médicas</h2>
                        <div className="perfil__form">
                            <form onSubmit={handleSubmit} className="newDate__form">
                                <div className="form__name mb-5">
                                    <Form.Select size="lg" 
                                    aria-label="Default select example"
                                    onChange={({ target }) => {setSpecialtySelected(target.value)}}>
                                        <option>Escoje una especialidad:</option>
                                        {specialty.map((specialty) => (
                                            <option key={specialty._id} value={specialty._id}>{specialty.name}</option>
                                        ))}

                                    </Form.Select>

                                    <Form.Select 
                                    size="lg" 
                                    aria-label="Default select example"
                                    onChange={({target}) => setDoctorSelected(target.value)}>
                                        <option>Escoje el médico de tu preferencia:</option>

                                        { 
                                        filteredDoctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor._id}>{ doctor.name }</option>
  
                                        )) 
                                    }
                                        
                                    </Form.Select>
                                </div>

                                <div className="form__name">
                                    <Form.Select 
                                    size="lg" 
                                    aria-label="Default select example"
                                    onChange={({target}) => setLocationSelected(target.value)}
                                    >
                                        <option>Escoje la sede que mejor se adpate a ti:</option>
                                        { 
                                        filteredLocation.map((location) => (
                                            <option key={location._id} value={location._id}>{location.name}</option>

                                        )) 
                                        }

   
                                    </Form.Select>
                                </div>

                                <hr className="hr" />

                                <div className="new-date__calendar">
                                    <label htmlFor="" className="label__form">Fecha:

                                        <div className="form__date">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(handleDateChage)}
                                                format="yyyy-MM-dd"
                                                value={selectedDate}
                                                min="2024-08-01"
                                                max="2024-12-31"
                                                 />   
                                                                                        
                                        </div>


                                        {
                                             selectedDate && isDateBlocked(selectedDate) ? (
                                                <p style={{ color: 'red' }}>La fecha seleccionada no está disponible.</p>
                                            ) : selectedDate ? (
                                                <p>La fecha seleccionada está disponible.</p>
                                            ) : (
                                                <p>Selecciona una fecha para comprobar la disponibilidad.</p>
                                            )
                                        }
                                    </label>
                                    
                                </div>
                                {
                                    id ? <Button
                                        variant="primary"
                                        size="lg"
                                        className="form__date--btn"
                                        disabled={!isFormValid()}
                                        type="submit"> Actualizar información</Button>  :
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="form__date--btn"
                                            disabled={!isFormValid()}
                                            type="submit"> Guardar información</Button>
                                }
                                

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewDate;