import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UilUserMd } from '@iconscout/react-unicons'
import { UilBookMedical } from '@iconscout/react-unicons'
import { UilBooks } from '@iconscout/react-unicons'
import { Uil21Plus } from '@iconscout/react-unicons'
import './services.css';
import { Button } from "react-bootstrap";

const Servcios = () => {
    const navigate = useNavigate();
    return (
        <div className='servicios'>
            <div className="servicios__container">
                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilUserMd size="100" color="#6D30ED" />
                    </div>
                    <h4 className="title">Encuentra tu médico ideal</h4>
                    <label className="subtitle">Explora nuestra amplia seleccion de médicos y selecciona al especialista indicado para ti</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilBookMedical size="100" color="#6D30ED" />
                    </div>
                    <h4 className="title">Reserva tu cita en linea</h4>
                    <label className="subtitle">Nuestrosistemade reservas te permite programar tus citas médicas de manera rapida y sencilla, sin tener que llamar o visitar la clinica.</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilBooks size="100" color="#6D30ED" />
                    </div>
                    <h4 className="title">Gestiona tus citas médicas</h4>
                    <label className="subtitle ">Accede a tu perfil para ver y administrar  tus citas médicas de forma conveniente.</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <Uil21Plus size="100" color="#6D30ED" />
                    </div>
                    <h4 className="title">Siempre disponible</h4>
                    <label className="subtitle">Accede en cualquier momento a nustra plataforma.</label>
                </div>
            </div>
            
            <div className="servicios__container--button">
                <Button size='lg' className="btn-primary"
                onClick={() => navigate('/register')}>Reservar</Button>
            </div>


        </div>
    )
}

export default Servcios