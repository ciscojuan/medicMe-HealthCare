import React, { useState } from "react";
import { UilUserMd } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import userService from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/logoWhite.png';
import Notification from "../../shared/Notification";
import './register.css';
import login from "../../services/login";

const Register = () => {

    const navigate = new useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials= { email, password };

        const newUser = await userService.saveCredentials(credentials)
        
        setEmail("")
        setPassword("")

        setSuccessMessage("Usuario creado con exito")

        //accedo con las credenciales recien creadas para generar el token

        const user = await login.auth(credentials)
        localStorage.setItem("userLogged", JSON.stringify({token: user.token, id: user.id}));


         setTimeout(() => {

            setSuccessMessage(null);
            navigate(`/user-management/${user.id}`)
        }, 2000); 
    };

    return (
      <div className="register">
        <div className="register__nav">
          <div className="register__nav--img">
            <img src={logo} alt="MedicMe - HealthCare" />
          </div>
        </div>
        <div className="register__container">
          <div className="register__services">
            <div className="register__service--icons">
              <div className="service__icon">
                <UilUserMd size="80" color="#6D30ED" />
              </div>
              <div className="service__icon">
                <UilCalendarAlt size="80" color="#6D30ED" />
              </div>
              <div className="service__icon">
                <UilUserMd size="80" color="#6D30ED" />
              </div>
            </div>
            <div className="register__title">
              <h2>Registrate y comienza ahora</h2>
            </div>
            <div className="register__service--content">
              <label>
                MedicMe, la innovadora aplicacion diseñada para simplificar tu
                vida y hacer el agendamiento de citas algo censillo.
              </label>
            </div>
          </div>

          <div className="register__form">
            <div className="register__form--container">
              <div className="register__title">
                <h2>Formulario de Registro</h2>
              </div>

              <div className="register__form--content">
                <Notification
                  messageError={errorMessage}
                  message={successMessage}
                />
                <form onSubmit={handleSubmit}>
                  <label htmlFor="floatingInputCustom">Email</label>
                  <Form.Floating className="form-floating__register">
                    <Form.Control
                      id="floatingInputCustom"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </Form.Floating>
                  <label htmlFor="floatingPasswordCustom">Contraseña</label>
                  <Form.Floating className="form-floating__register">
                    <Form.Control
                      id="floatingPasswordCustom"
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </Form.Floating>
                  <div className="register__buton">
                    <Button
                      v
                      ariant="primary"
                      size="lg"
                      className="btn-register"
                      type="submit"
                    >
                      {" "}
                      Ingresar
                    </Button>
                    <label>Ya tienes cuenta?</label>{" "}
                    <Link to="/login">Ingresa aca</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="leftCircle"></div>
        <div className="rightCircle"></div>
        <div className="rightRectangle"></div>
      </div>
    );
}
export default Register;