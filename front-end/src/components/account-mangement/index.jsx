import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import { Link, useNavigate, useParams } from "react-router-dom";
import userService from "../../services/user";
import logo from '../../assets/logo.png';
import logoWithe from '../../assets/logoWhite.png';
import logoBlack from '../../assets/logoblack.png'
import avatar from '../../assets/header-img-p3.png'
import Nav from "../../shared/nav";
import Footer from "../../shared/footer";
import './account.css';

const AccountManagement = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const [credencial, setCredentials] = useState([])
    const [user, setUser] = useState([]);
    const [update, setUpdate] = useState(false);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('')
    
    useEffect(() =>{
        userService.getCredentials(userLogged.id).then((res)=>{
            setCredentials(res.data)
        })
    },[])

    useEffect(()=>{
        
        userService.getUser(id).then((res)=>{
            setUser(res.data)
            setUpdate(true)
        })
    }, [])

console.log(user)
console.log(userLogged.id)
    const handleSubmit = (e) =>{

        e.preventDefault()
        const credentiales = {name, lastname, phone, birthdate, address, credentials: userLogged.id}
        console.log(credentiales)
        
        if(update){
            try {
                const updateUser = userService.updateUser(user._id, credentiales).then((res) => {
                    console.log(res)

                    const userId = updateUser._id

                    setTimeout(() => {
                        navigate(`/user-panel/${userId}`)
                    })
                })
            } catch (err) {
                console.log(err)
            } 
        }else{
            try {
                const savedUser = userService.saveUser(credentiales).then((res) => {
                    console.log(res)

                    const userId = savedUser._id

                    setTimeout(() => {
                        navigate(`/user-management/${userId}`)
                    })
                })
            } catch (err) {
                console.log(err)
            } 
        }

    }

    const getDate = (birthDate) => {
        const date = moment(birthDate);
        const today = moment();
        const age = today.diff(date, 'years');
        return age;
    } 

    const logOut = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <div className="user-panel">
            <Nav className="nav--purple" logo={logoBlack} />

            <div className="user-panel__container">

                <div className="sidebar__perfil">

                    <div className="perfil__title">
                        <h3>Informacion Personal</h3>
                    </div>

                    <div className="perfil__portrait">

                        <div className="perfil__portrait--image">
                            <img src={ user.avatar || avatar } alt="Username" />
                        </div>

                        <div className="perfil__portrait--info">

                            <div className="info__name">
                                <p>{ user.name || 'Juan Perez Lozano'} {user.lastname}</p>
                            </div>

                            <div className="perfil__rol">
                                <p>{ user.credentials?.role || 'Paciente'}</p>
                            </div>

                            <div className="perfil__age">
                                <p>Edad: { getDate(user.birthdate) }</p>
                            </div>

                            <div className="perfil__email">
                                <p>{ user.phone || '320 366 1206'}</p>
                            </div>

                            <div className="perfil__email">
                                <p>{ user.credentials?.email || 'juan@mail.com'}</p>
                            </div>

                            <Button onClick={() => logOut()}>Cerrar sesion</Button>

                        </div>
                    </div>
                </div>

                <div className="sidebar__user-panel">

                    <div className="perfil__form">
                        <div className="register__title">
                            <h2>Actualizacion de Datos</h2>
                        </div>

                        <form onSubmit={handleSubmit} className='form__container'> 
                            <div className="form__name">
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="nombre"
                                        type="text"
                                        placeholder="nombre"
                                        value={name}
                                        onChange={({ target }) => setName(target.value)} />
                                    <label htmlFor="nombre">{user.name} </label>
                                </Form.Floating>
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="apellido"
                                        type="text"
                                        placeholder="Apellido"
                                        value={lastname}
                                        onChange={({ target }) => setLastname(target.value)}
                                    />
                                    <label htmlFor="apellido">{user.lastname}</label>
                                </Form.Floating>
                            </div>

                            <div className="form__name">
                                <Form.Floating >
                                    <Form.Control
                                        id="telefono"
                                        type="text"
                                        placeholder="Telefono"
                                        value={phone}
                                        onChange={({ target }) => setPhone(target.value)}
                                    />
                                    <label htmlFor="telefono">{user.phone} </label>
                                </Form.Floating>
                                <Form.Floating>
                                    <Form.Control
                                        id="cumpleaños"
                                        type="date"
                                        placeholder="dd-mm-yyyy"
                                        value={birthdate}
                                        onChange={({ target }) => setBirthdate(target.value)}
                                    />
                                    <label htmlFor="cumpleaños">Cumpleaños</label>
                                </Form.Floating>
                            </div>

                            <div className="form__direction">
                                <Form.Floating>
                                    <Form.Control
                                        id="direccion"
                                        type="text"
                                        placeholder={user.address || 'Direccion'}
                                        value={address}
                                        onChange={({ target }) => setAddress(target.value)}
                                    />
                                    <label htmlFor="direccion">Direccion</label>
                                </Form.Floating>
                            </div>

                            <hr className="hr" />

                            <div className="form__name">
                                <Form.Floating>
                                    <Form.Control
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={user.credentials?.email}
                                        disabled
                                    />
                                    <label htmlFor="email">Email</label>
                                </Form.Floating>
                                <Form.Floating className="mb-2">
                                    <Form.Control
                                        id="password"
                                        type="pasword"
                                        placeholder="Contraseña"
                                        value={user.credentials?.password}
                                        disabled
                                    />
                                    <label htmlFor="password">Contraseña </label>
                                </Form.Floating>
                            </div>

                            <Form.Floating
                                className="btn-send" >
                                { update ?
                                    <Button variant="primary" size="lg"
                                        className="btn-send"
                                        type='submit'> Actualizar información</Button>
                                    :
                                    <Button variant="primary" size="lg"
                                 className="btn-send"
                                 type='submit'> Guardar información</Button>}
                            </Form.Floating>
                        </form>

                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccountManagement;