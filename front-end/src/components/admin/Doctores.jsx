import userService from '../../services/user'
import moment from 'moment';
const Doctores = ({ doctores }) => {

    const getAge = (birthdate) => {
        const date = moment(birthdate);
        const today = moment();
        const age = today.diff(date, 'years');
        return age;
    }

    const getDate = (birthdate) =>{
        return moment(birthdate).format('DD/MM/YYYY : HH:MM');

    }
    return (

            <div className="table table-bordered table-responsive align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Email</th>
                        <th scope="col">Fecha Creacion</th>
                        <th scope="col">Fecha Actualizacion</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {doctores.map((doctor, index) => (
                        <tr key={doctor._id}>
                            <td scope="row">{doctor.name}</td>
                            <td>{doctor.lastname}</td>
                            <td>{getAge(doctor.birtdate)}</td>
                            <td>{doctor.phone}</td>
                            <td>{doctor.address}</td>
                            <td>{doctor.credentials.email}</td>
                            <td>{getDate(doctor.createAt)}</td>
                            <td>{getDate(doctor.updateAt)}</td>
                            <td class="d-grid gap-2">
                                <button
                                    class="btn btn-sm btn-danger"
                                    onClick={() => userService.getUser(doctor._id)} >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </div>
    )
}
export default Doctores;