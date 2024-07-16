import React from "react";
import Button from '../../../shared/button'
import './registro.css'
const Registro = () => {
    return (
        <div>
            <div className="registro">
                <div className="registro__container">
                    <div className="registro__container--title">Registrate y programa una cita ahora</div>
                <div className="registro__container--content">Encuentra los mejores médicos y agenda en linea</div>
                <Button text="Reserva una cita" className="button--lg-dark"/>
                </div>
            </div>
        </div>
    )
}
export default Registro;