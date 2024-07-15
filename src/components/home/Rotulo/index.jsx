import React from 'react';
import './rotulo.css';

const Rotulo = () => {
    return(
        <div className='rotulo'>
            <h2 className='rotulo__title'>Cómo funciona nuestro sistema de <span>Reservas</span></h2>
            <p className='rotulo__subtitle'>Nuestro sistema de reservas permite a los pacientes y administradores acceder a una lista de médicos, y programar citas de manera facíl y conveniente</p>
        </div>
    )
}
export default Rotulo;
