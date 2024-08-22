import userService from "../../services/user";
import moment from "moment";

const Pacientes = ({ pacientes }) => {
  const getAge = (birthdate) => {
    const date = moment(birthdate);
    const today = moment();
    const age = today.diff(date, "years");
    return age;
  };

  const getDate = (birthdate) => {
    return moment(birthdate).format("DD/MM/YYYY : HH:MM");
  };

  return (
    <table className="table align-middle">
      <thead className="table-dark">
        <tr scope="col">
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Email</th>
          <th>F. Creacion</th>
          <th>F. Actualizacion</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente, index) => (
          <tr scope="row">
            <td>{paciente.name}</td>
            <td>{paciente.lastname}</td>
            <td>{getAge(paciente.birthdate)}</td>
            <td>{paciente.phone}</td>
            <td>{paciente.address}</td>
            <td>{paciente.credentials.email}</td>
            <td>{getDate(paciente.createAt)}</td>
            <td>{getDate(paciente.updateAt)}</td>
            <td className="d-grid gap-2">
              <button
                class="btn btn-sm btn-danger"
                onClick={() => userService.getUser(paciente._id)}
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
export default Pacientes;
