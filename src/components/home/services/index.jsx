import React from 'react';
import { UilUserMd } from '@iconscout/react-unicons'
import { UilBookMedical } from '@iconscout/react-unicons'
import { UilBooks } from '@iconscout/react-unicons'
import { Uil21Plus } from '@iconscout/react-unicons'
import './services.css';
import Button from '../../../shared/button';

const Servcios = () => {
    return (
        <div className='servicios'>
            <div className="servicios__container">
                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilUserMd size="100" color="#6D30ED" />
                    </div>
                    <label className="title">Encuentra tu médico ideal</label>
                    <label className="subtitle">Explora nuestra amplia seleccion de médicos y selecciona al especialista indicado para ti</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilBookMedical size="100" color="#6D30ED" />
                    </div>
                    <label className="title">Reserva tu cita en linea</label>
                    <label className="subtitle">Nuestrosistemade reservas te permite programar tus citas médicas de manera rapida y sencilla, sin tener que llamar o visitar la clinica.</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <UilBooks size="100" color="#6D30ED" />
                    </div>
                    <label className="title">Gestiona tus citas médicas</label>
                    <label className="subtitle ">Accede a tu perfil para ver y administrar  tus citas médicas de forma conveniente.</label>
                </div>

                <div className="servicios__card">
                    <div className="servicios__card1--icon">
                        <Uil21Plus size="100" color="#6D30ED" />
                    </div>
                    <label className="title">Siempre disponible</label>
                    <label className="subtitle">Accede en cualquier momento a nustra plataforma.</label>
                </div>
            </div>
            
            <div className="servicios__container--button">
                <Button className='button--lg-light' text="Reservar" />
            </div>


        </div>
    )
}

export default Servcios