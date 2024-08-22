import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { UilFolderPlus } from "@iconscout/react-unicons";
import { UilCalender } from "@iconscout/react-unicons";
import { Link, useNavigate, useParams } from "react-router-dom";
import userService from "../../services/user";
import logo from "../../assets/logo.png";
import logoWithe from "../../assets/logoWhite.png";
import logoBlack from "../../assets/logoblack.png";
import avatar from "../../assets/header-img-p3.png";
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import "./account.css";

const AccountManagement = () => {
  const test_img = "https://github.com/mdo.png";
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

const [isMenuOpen, setIsMenuOpen] = useState(true)

  const [credencial, setCredentials] = useState([]);
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    userService.getCredentials(userLogged.id).then((res) => {
      setCredentials(res.data);
      console.log(credencial);
      if (!id) return;
      userService
        .getUser(id)
        .then((res) => {
          setUser(res.data);
          setUpdate(true);
          console.log(user);
        })
        .catch((error) => {
          // Manejo del error si el usuario no existe o hubo un problema con la solicitud
          console.error("Error al obtener el usuario:", error);
        });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentiales = {
      name,
      lastname,
      phone,
      birthdate,
      address,
      credentials: userLogged.id,
    };
    console.log(credentiales);

    if (update) {
      try {
        const updateUser = userService
          .updateUser(user._id, credentiales)
          .then((res) => {
            console.log(res);

            const updateUserId = updateUser._id;

            setTimeout(() => {
              navigate(`/user-panel/${updateUserId}`);
            });
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const savedUser = userService.saveUser(credentiales).then((res) => {
          console.log(res);

          const saveUserId = savedUser._id;

          setTimeout(() => {
            navigate(`/user-management/${saveUserId}`);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getDate = (birthDate) => {
    const date = moment(birthDate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="d-flex ">
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

      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-3">
        <div className="h2 text-center mt-5">
          Actualización de datos personales
        </div>
        <div className="row mx-auto col-lg-10 col-md-12 mt-5 bg-light">
          <form onSubmit={handleSubmit} class="form-control">
            <div className="form-group">
              <label for="name">Nombre:</label>
              <input
                id="name"
                type="text"
                placeholder={user.name}
                className="form-control"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                id="apellido"
                type="text"
                placeholder={user.lastname}
                className="form-control"
                value={lastname}
                onChange={({ target }) => setLastname(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">{user.phone} </label>
              <input
                id="telefono"
                type="text"
                className="form-control"
                placeholder={user.phone}
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cumpleaños">Cumpleaños</label>
              <input
                className="form-control"
                id="cumpleaños"
                type="date"
                placeholder="dd-mm-yyyy"
                value={birthdate}
                onChange={({ target }) => setBirthdate(target.value)}
              />
            </div>

            <div className="form-group">
              <label for="direccion"></label>
              <input
                className="form-control"
                id="direccion"
                type="text"
                placeholder={user.address || "Direccion"}
                value={address}
                onChange={({ target }) => setAddress(target.value)}
              />
            </div>

            <hr className="hr" />

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                type="text"
                value={user.credentials?.email || credencial?.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label for="password">Contraseña </label>
              <input
                className="form-control"
                id="password"
                type="pasword"
                placeholder="Contraseña"
                value="***"
                disabled
              />
            </div>
            <hr className="hr" />
            <div className="form-group"></div>
            <Form.Floating className="btn-send">
              {update ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-send"
                  type="submit"
                >
                  Actualizar información
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-send"
                  type="submit"
                >
                  Guardar información
                </Button>
              )}
            </Form.Floating>
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

export default AccountManagement;
