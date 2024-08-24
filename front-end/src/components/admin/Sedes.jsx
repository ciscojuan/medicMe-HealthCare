import react, { useState, useEffect } from "react";
import userService from "../../services/user";
import Location from "./location";
import Notification from "../../shared/Notification";
const Sedes = ({ sedes, setSedes }) => {
  //show/hide location component
  const [location, setLocation] = useState(false);
  //components for Location component
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [message, setMessage] = useState("");
  const [specialty, setSpecialty] = useState("");

  const deleteSede = (id) => {
    window.confirm("¿Estas seguro de eliminar esta sede?") &&
      userService.deletLocation(id).then((res) => {
        setSedes(sedes.filter((sede) => sede._id !== id));
      });
  };

  const handleAddLocation = (newLocation) => {
    console.log(newLocation);

    try {
      userService.savedLocation(newLocation).then((res) => {
        setSedes([...sedes, newLocation]);
        setMessage("Sede añadida");
        setLocation(!location);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
    } catch {}
  };

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
          {sedes.map(
            (sede, index) =>
              sede && (
                <tr key={sede._id}>
                  <td scope="row">{sede.name}</td>
                  <td>{sede.direction}</td>
                  <td class="d-grid gap-2">
                    <button
                      class="btn btn-primary mx-3"
                      onClick={() => deleteSede(sede._id)}
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
              )
          )}
        </tbody>
      </table>
      {location ? <Location handleAddLocation={handleAddLocation} /> : null}

      <Notification message={message} />
    </>
  );
};
export default Sedes;
