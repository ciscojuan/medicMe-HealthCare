import userService  from '../../services/user'
const Especialidades = ({ especialidades }) => {
    return (

            <table className="table align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Especialidad</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {especialidades.map((especialidad, index) => (
                        <tr key={especialidad._id}>
                            <td scope="row">{especialidad.name}</td>
                            <td class="d-grid gap-2">
                                <button
                                    class="btn btn-sm btn-danger"
                                    onClick={() => userService.getUser(especialidad._id)} >Eliminar</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

    )
}
export default Especialidades;