import userService from "../../services/user";
const Sedes = ({sedes}) =>{
    return (

            <table className="table table-bordered  table-hover ">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Sede</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {sedes.map((sede, index) => (
                        <tr key={sede._id}>
                            <td scope="row">{sede.name}</td>
                            <td>{sede.direction}</td>
                            <td class="d-grid gap-2">
                                <button
                                    class="btn btn-sm btn-danger"
                                    onClick={() => userService.getUser(sede._id)} >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    <tr>


                    </tr>
                </tbody>
            </table>
    )
}
export default Sedes;