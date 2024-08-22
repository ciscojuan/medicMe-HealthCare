import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UilFolderPlus } from "@iconscout/react-unicons";
import { UilCalender } from "@iconscout/react-unicons";

import moment from "moment";
import userService from "../../services/user";
import DatePicker from "react-datepicker";
import logo from "../../assets/logo.png";
import logoWithe from "../../assets/logoWhite.png";
import logoBlack from "../../assets/logoblack.png";
import avatar from "../../assets/header-img-p3.png";
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import "react-datepicker/dist/react-datepicker.css";
import "./new-date.css";

const NewDate = () => {
  const test_img = "https://github.com/mdo.png";
  const navigate = useNavigate();
  const { id } = useParams();

  // Almacernar las fechas ya asignadas
  const [blockDates, setBlockDates] = useState([]);

const [isMenuOpen, setIsMenuOpen] = useState(true)

  const minDate = new Date(Date());

  const [user, setUser] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [specialty, setSpeciaity] = useState([]);
  const [locations, setLocation] = useState([]);
  //handle update data
  const [update, setUpdate] = useState(false);

  //estado para almacenar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState("");
  const [specialtySelected, setSpecialtySelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [doctorSelected, setDoctorSelected] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);

  useEffect(() => {
    //guardar usuario del localstorage en el estado
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));
    const id = userLogged.id;
    userService.getUserFromCredential(id).then((res) => {
      setUser(res.data);
    });

    userService.getDoctors().then((res) => {
      setDoctor(res.data);
    });

    userService.getSpecialty().then((res) => {
      setSpeciaity(res.data);
    });

    userService.getLocations().then((res) => {
      setLocation(res.data);
    });
  }, []);

  useEffect(() => {
    if (user && user._id) {
      userService.getAllBookings().then((res) => {
        const dates = res.data.map((booking) => booking.appointment);
        setBlockDates(dates);
      });
    }
  }, [user]);

  const formatDates = blockDates.map((date) => date.split("T")[0]);

  useEffect(() => {
    if (specialtySelected) {
      // Filtrar los doctores según la especialidad seleccionada
      const doctorFilter = doctor.filter(
        (doctor) => doctor.specialty._id === specialtySelected
      );
      setFilteredDoctors(doctorFilter);

      const locationFilter = locations.filter(
        (location) => location.specialty._id === specialtySelected
      );
      setFilteredLocation(locationFilter);
    } else {
      setFilteredDoctors([]);
      setFilteredLocation([]);
    }
  }, [specialtySelected, doctor, locations]);

  useEffect(() => {
    if (!id) return;
    setUpdate(true);
  }, [id]);

  const handleDateChage = (date) => {
    date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    console.log(date);
    setSelectedDate(date);
  };

  // Función para comprobar si una fecha está bloqueada
  const isDateBlocked = (date) => {
    //date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return formatDates.includes(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update) {
      try {
        const newData = {
          paciente_id: user._id,
          doctor_id: doctorSelected,
          sede_id: locationSelected,
          specialty_id: specialtySelected,
          appointment: selectedDate,
        };

        setDoctorSelected("");
        setSpecialtySelected("");
        setLocationSelected("");
        setSelectedDate("");

        userService.updateBooking(id, newData);
        console.log(newData);
        navigate(`/user-panel`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const newData = {
          paciente_id: user._id,
          doctor_id: doctorSelected,
          sede_id: locationSelected,
          specialty_id: specialtySelected,
          appointment: selectedDate,
        };

        setDoctorSelected("");
        setSpecialtySelected("");
        setLocationSelected("");
        setSelectedDate("");

        userService.saveBooking(newData);
        console.log(newData);
        navigate(`/user-panel`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getDate = (birthdate) => {
    const date = moment(birthdate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/home");
  };

  const isFormValid = () => {
    return (
      specialtySelected !== "" &&
      doctorSelected !== "" &&
      locationSelected !== "" &&
      selectedDate &&
      !isDateBlocked(selectedDate)
    );
  };

  return (
    <div className="d-flex">
      {isMenuOpen ? (
        <div
          className="d-flex flex-column  flex-shrink-0 p-3 text-white sticky-top"
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
      ) : null}

      <div className="flex-grow-1 p-3">
        <div className="h2 text-center mt-5">Asignacion de citas médicas</div>
        <div className="row mx-auto col-lg-10 col-md-12 mt-5 bg-light">
          <form onSubmit={handleSubmit} className="form-control">
            <div className="form-group">
              <label htmlFor="especialidad">Especialidad:</label>
              <select
                className="custom-select"
                id="especialidad"
                onChange={({ target }) => {
                  setSpecialtySelected(target.value);
                }}
              >
                <option>Escoje una especialidad:</option>
                {specialty.map((specialty) => (
                  <option key={specialty._id} value={specialty._id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="doctor">Doctor:</label>
              <select
                className="custom-select"
                id="doctor"
                onChange={({ target }) => setDoctorSelected(target.value)}
              >
                <option>Escoje el médico de tu preferencia:</option>

                {filteredDoctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {`${doctor.name} ${doctor.lastname}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sede">Sede</label>
              <select
                className="custom-select"
                id="sede"
                onChange={({ target }) => setLocationSelected(target.value)}
              >
                <option>Escoje la sede que mejor se adpate a ti:</option>
                {filteredLocation.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <hr className="text-white" />

            <div className="form-group">
              <label htmlFor="fecha" className="label__form">
                Fecha:
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChage}
                    format="yyyy-MM-dd"
                    value={selectedDate}
                    min="2024-08-01"
                    max="2024-12-31"
                    id="fecha"
                  />
                </div>
                {selectedDate && isDateBlocked(selectedDate) ? (
                  <p style={{ color: "red" }}>
                    La fecha seleccionada no está disponible.
                  </p>
                ) : selectedDate ? (
                  <p>La fecha seleccionada está disponible.</p>
                ) : (
                  <p>Selecciona una fecha para comprobar la disponibilidad.</p>
                )}
              </label>
            </div>

            {id ? (
              <button
                type="submit"
                disabled={!isFormValid()}
                className="btn btn-primary"
              >
                Actualizar información
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid()}
                className="btn btn-primary"
              >
                Enviar
              </button>
            )}
          </form>
        </div>
      </div>

      <label for="nav__checkbox" className="menu-sidebar">
        {isMenuOpen ? (
          <svg
            viewBox="0 0 384 512"
            width="25"
            title="times"
            color=""
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 448 512"
            width="25"
            title="bars"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        )}
      </label>
    </div>
  );
};

export default NewDate;
