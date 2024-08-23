import React, { useEffect, useState } from "react";
import logo from "../../assets/logoblack.png";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "./admin.css";

import userService from "../../services/user";
import Pacientes from "./Pacientes";
import Doctores from "./Doctores";
import Especialidades from "./Especialidades";
import Sedes from "./Sedes";
import Location from "./location";

const Admin = () => {
  const navigate = useNavigate()
  const test_img = "https://github.com/mdo.png";
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const [user, setUser] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [reservas, setReservas] = useState([])

  const [showPacientes, setShowPacientes] = useState(false);
  const [showDoctores, setShowDoctores] = useState(false);
  const [showEspecialidades, setShowEspecialidades] = useState(false);
  const [showSedes, setShowSedes] = useState(false);

  const showPaciente = () => {
    setShowPacientes(true);
    setShowDoctores(false);
    setShowEspecialidades(false);
    setShowSedes(false);
  };

  const showDoctor = () => {
    setShowPacientes(false);
    setShowDoctores(true);
    setShowEspecialidades(false);
    setShowSedes(false);
  };

  const showEspecialidad = () => {
    setShowPacientes(false);
    setShowDoctores(false);
    setShowEspecialidades(true);
    setShowSedes(false);
  };

  const showSede = () => {
    setShowPacientes(false);
    setShowDoctores(false);
    setShowEspecialidades(false);
    setShowSedes(true);
  };

  useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem("userLogged")); //devuelvo el contenido de localS en formato JSON

        const userId = userLogged.id;

        userService.getUserFromCredential(userId).then((res) => {
          setUser(res.data);
        });
  }, []);

  useEffect(() => {
    userService.getUsers().then((response) => {
      setUsers(response.data);
    });

    userService.getSpecialty().then((res) => {
      setEspecialidades(res.data);
    });

    userService.getLocations().then((res) => {
      setSedes(res.data);
    });

    userService.getAllBookings().then((res) => {
      setReservas(res.data)
    })
  }, []);

  useEffect(() => {
    if (users) {
      const pacientes = users.filter(
        (user) => user.credentials?.role === "patient"
      );
      const doctores = users.filter(
        (user) => user.credentials?.role === "Doctor"
      );

      setPacientes(pacientes);
      setDoctores(doctores);
    }
  }, [users]);

  const getDate = (birthDate) => {
    const date = moment(birthDate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };

    const logOut = () => {
      window.localStorage.clear();
      navigate("/home");
    };

  return (
    <div className="d-flex">
      {isMenuOpen ? (
        <div
          className="d-flex flex-column  flex-shrink-0 p-3 text-white sticky-top menu-toggleable"
          style={{
            width: "280px",
            height: "100vh",
            background: "#6f42c1",
          }}
        >
          <div className="h3 text-center">{`${user.name} ${user.lastname}`}</div>
          <img
            src={test_img}
            className="img-thumbnail rounded-circle mx-auto"
            alt="card-img-top"
            width="150"
          />
          <div className="d-flex flex-column mt-3">
            <p className="text-center">
              {user ? user.credentials?.role : "Paciente"}
            </p>
            <p className="text-center">Edad: {getDate(user.birthdate)}</p>
            <p className="text-center">{user ? user.phone : "Telefono"}</p>
            <p className="text-center">
              {user ? user.credentials?.email : "Email"}
            </p>
          </div>
          <hr style={{ color: "white" }} />
          <ul className="nav nav-pills flex-column mb-auto menu-user">
            <li className="nav-link" onClick={() => showPaciente()}>
              <i className="bi bi-person me-2" style={{ color: "#fff" }}></i>
              Pacientes
            </li>
            <li className="nav-link" onClick={() => showDoctor()}>
              <i
                className="bi bi-person-circle me-2 text-white"
              ></i>
              Doctores
            </li>
            <li className="nav-link" onClick={() => showSede()}>
              <i className="bi bi-buildings me-2" style={{ color: "#fff" }}></i>
              Sedes
            </li>
            <li className="nav-link" onClick={() => showEspecialidad()}>
              <i className="bi bi-calendar3 me-2" style={{ color: "#fff" }}></i>
              Especialidades
            </li>
          </ul>
          
          <hr className="dropdown-divider"></hr>
          <div
            className="btn btn-lg btn-outline-light"
            data-logOff="1"
            onClick={() => logOut()}
          >
            Cerrar sesion
          </div>
        </div>
      ) : null}

      <div className="d-flex flex-column align-items-center mt-5 ">
        <div className="row ">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mb-sm-5">
            <div
              className="card mx-auto"
              style={{ backgroundColor: "#f5f1ff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h5 className="card-title">Pacientes</h5>
                <p className="card-text text-center">
                  Contamos con {pacientes.length} usuarios registrados.
                </p>
                <p>
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "60px", color: "#6f42c1" }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mb-sm-5">
            <div
              className="card mx-auto"
              style={{ backgroundColor: "#EDD5E2" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h5 className="card-title">Citas médicas</h5>
                <p className="card-text text-center">
                  {reservas.length} Total de citas médicas agendadas.
                </p>
                <p>
                  <i
                    className="bi bi-calendar3"
                    style={{ fontSize: "60px", color: "#d0176c" }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mb-sm-5">
            <div
              className="card mx-auto"
              style={{ backgroundColor: "#f0f9ff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h5 className="card-title">Sedes médicas</h5>
                <p className="card-text text-center">
                  Contamos con {sedes.length} sedes.
                </p>
                <p>
                  <i
                    className="bi bi-buildings"
                    style={{ fontSize: "60px", color: "#039afe" }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mb-sm-5">
            <div
              className="card mx-auto"
              style={{ backgroundColor: "#fcf7df" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h5 className="card-title">Doctores</h5>
                <p className="card-text text-center">
                  Contamos con {doctores.length} usuarios registrados.
                </p>
                <p>
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "60px", color: "#b39502" }}
                  ></i>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row col-12 col-md-10 ">
          <div className="table-responsive">
            {showPacientes ? (
              <Pacientes pacientes={pacientes} />
            ) : showDoctores ? (
              <Doctores doctores={doctores} especialidades={especialidades} />
            ) : showEspecialidades ? (
              <Especialidades especialidades={especialidades} />
            ) : showSedes ? (
              <Sedes sedes={sedes} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
