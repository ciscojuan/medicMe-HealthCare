import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import avatar1 from '../../../assets/header-img-p1.png'
import avatar2 from '../../../assets/header-img-p2.png'
import avatar3 from '../../../assets/header-img-p3.png'
import './registro.css'
const Registro = () => {
    const navigate = useNavigate()
    return (

        <div className="registro">
            <div className="registro__container">
                <div className="registro__container--title">Registrate y programa una cita ahora</div>
                <div className="registro__container--content">Encuentra los mejores médicos y agenda en linea</div>
                <Button size="lg" className="btn-secondary"
                onClick={() => navigate('/register')}> Registrate</Button>
                <div className="registro__leftRectangle"></div>
                <div className="registro__rightRectangle"></div>
                <img src={avatar1} className="registro__avatar1"></img>
                <img src={avatar2} className="registro__avatar2"></img>
                <img src={avatar3} className="registro__avatar3"></img>
            </div>

        </div>

    )
}
export default Registro;