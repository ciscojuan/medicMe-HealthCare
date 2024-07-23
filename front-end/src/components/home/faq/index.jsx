import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { UilQuestionCircle } from '@iconscout/react-unicons'
import faqImg from '../../../assets/faq.png'
import './faq.css'

const Faq = () => {
    return (
        <div className="faq">
            <div className="faq__container">
                <div className="faq__container--image">
                    <img src={faqImg} alt="medicMe - HealthCare" className="faq__img"></img>
                </div>
                <div className="faq__container--acordion">
                    <div className="acordion--title">
                        Tienes una pregunta?
                    </div>
                    <div className="acordion--content">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>¿Que es el sistema de reservas y cómo funciona?</Accordion.Header>
                                <Accordion.Body>
                                    Nuestro sistema de reservas ofrece a los pacientes la posibilidad de programar citas médicas online, las 24 horas del día, los 7 días de la semana. Pueden seleccionar el médico, la fecha y la hora disponibles y confirmar su cita de forma rápida y sencilla. El sistema actualiza automáticamente la agenda del médico y envía recordatorios a los pacientes, optimizando la gestión de citas, reduciendo las llamadas telefónicas y mejorando la experiencia general.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>¿Puedo cambiar la fecha de mi cita y el doctor de mi preferencia?</Accordion.Header>
                                <Accordion.Body>
                                    Si, en la mayoria de los casos puede cambiar la fecha de tus citas médicas y elejir el doctor de tu preferencia. Sin embargo, esto dependera de la disponibilidad del médico y de los horarios disponibles en la agenda.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>¿Cómo son tratados mi datos personales en el sistemade reservas?</Accordion.Header>
                                <Accordion.Body>
                                    Nos tomamos muy en serio la protección de tus datos personales. Nos regimos bajo la regulación HIPAA para el manejo de datos personales médicos, esta regulación establece estrictas normas para garantizar la confidencialidad, integridad y disponibilidad de tu información. Tus datos solo serán utilizados para fines relacionados con tu atención médica y nunca serán compartidos con terceros sin tu consentimiento expreso.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Faq;