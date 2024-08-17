
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logoblack.png'
import './admin.css'
import userService from '../../services/user';
import Pacientes from './Pacientes';
import Doctores from './Doctores';
import Especialidades from './Especialidades';
import Sedes from './Sedes';

const Admin = () =>{
    const [users, setUsers] = useState([])
    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [sedes, setSedes] = useState([]);

    const [showPacientes, setShowPacientes] = useState(false);
    const [showDoctores, setShowDoctores] = useState(false);
    const [showEspecialidades, setShowEspecialidades] = useState(false);
    const [showSedes, setShowSedes] = useState(false);

const showTitle = () =>{
    if(showPacientes){
        return "Pacientes"
    }else if(showDoctores){
        return "Doctores"
    }else if(showEspecialidades){
        return "Especialidades"
    }else if(showSedes){
        return "Sedes"
    }
}

    useEffect(() => {
        userService.getUsers().then((response) => {
            setUsers(response.data);
        });

        userService.getSpecialty().then((res) => {
            setEspecialidades(res.data)
        })
        
        userService.getLocations().then((res) => {
            setSedes(res.data)
        })

    }, []);

    useEffect(() => {
        if (users) {
            const pacientes = users.filter((user) => user.credentials?.role === 'patient');
            const doctores = users.filter((user) => user.credentials?.role === 'Doctor');

            setPacientes(pacientes);
            setDoctores(doctores);
        }
    }, [users]);

    return(
    <div className="admin-container">

            <div className="admin-sidebar">
                <div className="logo">
                    <img src={logo} alt="Medic Me - Health Care" />
                </div>

                <div className="admin-menu">
                    <ul>
                        <li onClick={() => setShowPacientes(!showPacientes)}>Pacientes</li>
                        <li onClick={() => setShowDoctores(!showDoctores)}>Doctores</li>
                        <li onClick={() => setShowEspecialidades(!showEspecialidades)}>Especialidades</li>
                        <li onClick={() => setShowSedes(!showSedes)}>sedes</li>
                    </ul>
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-content--title">
                    {
                        <h2>{showTitle()}</h2>
                    
                    }
        

                </div>
                <div className="admin-body">
                    { showPacientes ? <Pacientes pacientes={pacientes} /> : showDoctores ? <Doctores  doctores={doctores} /> : showEspecialidades ? <Especialidades especialidades={especialidades} /> : showSedes ? <Sedes sedes={sedes} /> : ""}
                </div>
            </div>
    </div>
)
}

export default Admin;