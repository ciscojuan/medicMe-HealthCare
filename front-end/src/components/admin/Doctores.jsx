import userService from "../../services/user";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Doctores = ({ doctores, especialidades }) => {
  const navigate = useNavigate()
  const getAge = (birthdate) => {
    const date = moment(birthdate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };

  const getDate = (birthdate) => {
    return moment(birthdate).format("DD/MM/YYYY : HH:MM");
  };

  const deleteDoctor = (id) => {
    window.confirm("¿Estas seguro de eliminar este doctor?") &&
    userService.deletUser(id);
    doctores.filter((doctor) => doctor._id !== id)
  };

  return (
    <table className="table">
      <thead className="table-dark">
        <tr scope="col">
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Email</th>
          <th>Especialidad</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {doctores.map((doctor, index) => (
          <tr scope="row">
            <td>{doctor.name}</td>
            <td>{doctor.lastname}</td>
            <td>{getAge(doctor.birthdate)}</td>
            <td>{doctor.phone}</td>
            <td>{doctor.address}</td>
            <td>{doctor.credentials.email}</td>
            <td>{doctor.specialty}</td>
            <td className="d-flex align-items-center">
              <button
                class="btn btn-primary mx-3"
                onClick={() => navigate(`/user-management/${doctor._id}`)}
              >
                Actualizar
              </button>
              <button
                class="btn btn-primary"
                onClick={() => deleteDoctor(doctor._id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Doctores;
