import React, { useEffect, useState } from "react";
import logo from "../../assets/logoblack.png";
import Footer from '../../shared/footer'
import "./admin.css";

import userService from "../../services/user";
import Pacientes from "./Pacientes";
import Doctores from "./Doctores";
import Especialidades from "./Especialidades";
import Sedes from "./Sedes";

const Admin = () => {
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

  const showTitle = () => {
    if (showPacientes) {
      return "Pacientes";
    } else if (showDoctores) {
      return "Doctores";
    } else if (showEspecialidades) {
      return "Especialidades";
    } else if (showSedes) {
      return "Sedes";
    }
  };

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

  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{ width: "280px", height: "100vh", background: "#6f42c1" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img src={logo} alt="Medicme - Healtcare" className="logo" />
        </a>
        <hr style={{ color: "white" }} />
        <ul className="d-flex flex-column mb-auto side-bar">
          <li className="nav-item" onClick={() => showPaciente()}>
            <i className="bi bi-person me-2" style={{ color: "#fff" }}></i>
            Pacientes
          </li>
          <li className="nav-item" onClick={() => showDoctor()}>
            <i className="bi bi-person-circle me-2" style={{ color: "#fff" }}></i>
            Doctores
          </li>
          <li className="nav-item" onClick={() => showSede()}>
            <i className="bi bi-buildings me-2" style={{ color: "#fff" }}></i>
            Sedes
          </li>
          <li className="nav-item" onClick={() => showEspecialidad()}>
            <i className="bi bi-calendar3 me-2" style={{ color: "#fff" }}></i>
            Especialidades
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center mt-5 table">
        <div className="row ">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3 mb-sm-5">
            <div
              className="card mx-auto"
              style={{ backgroundColor: "#f5f1ff" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h5 className="card-title">Nuestros usuarios</h5>
                <p className="card-text text-center">
                  Contamos con {users.length} usuarios registrados.
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
                <h5 className="card-title">Nuestros usuarios</h5>
                <p className="card-text text-center">
                  Contamos con {users.length} usuarios registrados.
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
                <h5 className="card-title">Nuestros usuarios</h5>
                <p className="card-text text-center">
                  Contamos con {users.length} usuarios registrados.
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

        <div className="row">
          {showPacientes ? (
            <Pacientes pacientes={pacientes} />
          ) : showDoctores ? (
            <Doctores doctores={doctores} />
          ) : showEspecialidades ? (
            <Especialidades especialidades={especialidades} />
          ) : showSedes ? (
            <Sedes sedes={sedes} />
          ) : null}
        </div>
      </div>
      
    </div>
  );
};

export default Admin;
