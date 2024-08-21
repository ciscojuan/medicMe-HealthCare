import React, { useState, useEffect } from "react";
import moment from "moment";

import logo from "../../assets/logo.png";
import logoWithe from "../../assets/logoWhite.png";
import logoBlack from "../../assets/logoblack.png";
import avatar from "../../assets/header-img-p3.png";
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import userService from "../../services/user";
import "./user-panel.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserPanel = () => {
  const test_img = "https://github.com/mdo.png";
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [user, setUser] = useState([]);
  const idParams = useParams();

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged")); //devuelvo el contenido de localS en formato JSON

    const userId = userLogged.id;

    userService.getUserFromCredential(userId).then((res) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (user && user._id) {
      // Ensure `user` is populated before fetching bookings
      userService.getBookings(user._id).then((res) => {
        setReservas(res.data); // Store fetched data in `reservas` state
      });
    }
  }, [user]);

  const logOut = () => {
    window.localStorage.clear();
    navigate("/home");
  };

  const getDate = (birthDate) => {
    const date = moment(birthDate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };

  const deleteBooking = (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    // If the user confirms, proceed with the deletion
    if (confirmDelete) {
      userService.deleteBooking(id).then(() => {
        setReservas((prevReservas) =>
          prevReservas.filter((booking) => booking._id !== id)
        );
      });
    }
  };
  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column  flex-shrink-0 p-3 text-white sticky-top"
        style={{ width: "280px", height: "100vh", background: "#6f42c1" }}
      >
        <div className="h3 text-center">
          {`${user.name} ${user.lastname}`}
        </div>

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
          <li className="nav-item">
            <Link
              to={`/user-management/${user._id}`}
              className="nav-link text-white"
              aria-current="page"
            >
              <i className="bi bi-person-fill-gear me-2"></i>
              Actualizar Datos
            </Link>
          </li>
          <li>
            <Link to="/new-date" className="nav-link text-white ">
              <i className="bi bi-calendar-plus me-2"></i>
              Agendar Cita
            </Link>
          </li>
          <li>
            <Link
              to={`/user-panel/${user._id}`}
              className="nav-link text-white active"
            >
              <i className="bi bi-person-fill-gear me-2"></i>
              Perfil
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-house me-2"></i>
              Home
            </Link>
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

      <div className="flex-grow-1 p-3">
        <div className="h2 text-center mt-5">Citas Médicas</div>
        <div className="row mx-auto col-lg-10 col-md-12 mt-5 ">
          {reservas !== null ? (
            reservas.map((booking, index) => {
              const appointmentDate = moment(booking.appointment);
              return (
                <div className="card flex-grow-1" key={booking.id}>
                  <div className="row ">
                    <div className="col-lg-3 col-md-3 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                      <p className="h4">Confirmado</p>
                      <p>Dia: {appointmentDate.format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                      <div className="card-body">
                        <p className="card-title">
                          <i
                            className="bi bi-person"
                            style={{ fontSize: "1em" }}
                          ></i>
                          {booking.doctor_id?.name} -{" "}
                          {booking.doctor_id?.lastname}
                        </p>
                        <p className="card-text">
                          <i
                            className="bi bi-pin-map"
                            style={{ fontSize: "1em" }}
                          ></i>
                          {booking.sede_id?.name} -{booking.sede_id?.direction}
                        </p>
                        <p className="card-text">
                          <i
                            className="bi bi-clock"
                            style={{ fontSize: "1em" }}
                          ></i>
                          Duración de la cita: 20 Minutos
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                      <button type="button" className="btn btn-warning mb-3">
                        <i
                          className="bi bi-arrow-clockwise mx-auto"
                          style={{ fontSize: "1.5em" }}
                          onClick={() => navigate(`/new-date/${booking._id}`)}
                        ></i>
                      </button>
                      <button type="button" className="btn btn-danger">
                        <i
                          className="bi bi-trash mx-auto"
                          style={{ fontSize: "1.5em" }}
                          onClick={() => deleteBooking(booking._id)}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No hay citas agendadas</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserPanel;
