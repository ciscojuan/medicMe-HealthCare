import react, { useState, useEffect } from "react";
import userService from "../../services/user";
import Location from "./location";
const Sedes = ({ sedes, setSedes }) => {
  const [location, setLocation] = useState(false);

  return (
    <>
      <table className="table table-bordered  table-hover ">
        <thead className="table-dark">
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
                  class="btn btn-primary mx-3"
                  onClick={() => userService.deletLocation(sede._id)}
                >
                  Eliminar
                </button>

                <button
                  class="btn btn-primary"
                  onClick={() => setLocation(!location)}
                >
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {location ? <Location sedes={sedes} setSedes={setSedes} /> : null}
    </>
  );
};
export default Sedes;
