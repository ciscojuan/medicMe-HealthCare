import userService  from '../../services/user'
const Especialidades = ({ especialidades, setEspecialidades }) => {

    const handleAddSpecialty = (id) => {
        userService.addSpecialty(id)
    }

    const deleteSpecialty = (id) => { 
      window.confirm("¿Estas seguro de eliminar esta especialidad?") &&
        userService.deleteSpecialty(id).then((res) => {
            setEspecialidades(
                especialidades.filter((especialidad) => especialidad._id !== id)
            );
        })
    }
    return (
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="">Especialidad</th>
            <th scope="">Accion</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad, index) => (
            <tr key={especialidad._id}>
              <td scope="row">{especialidad.name}</td>
              <td class="d-grid gap-2">
                <button
                  class="btn btn-primary mx-3"
                  onClick={() => handleAddSpecialty(especialidad._id)}
                >
                  Agregar
                </button>
                <button
                  class="btn btn-primary"
                  onClick={() => deleteSpecialty(especialidad._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
export default Especialidades;