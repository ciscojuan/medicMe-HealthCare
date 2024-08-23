import { useState } from "react";
import { useEffect } from "react";
import userService from "../../services/user";

const Location = ({ handleAddLocation }) => {
  const [especialidades, setEspecialidades] = useState([]);

  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    userService.getSpecialty().then((res) => {
      setEspecialidades(res.data);
    });
  }, []);

const handleSubmit = (e) =>{
  e.preventDefault()
  
  handleAddLocation({
    name: name,
    direction: direction,
    specialty: specialty,
  });

  setName("")
  setDirection("")
  setSpecialty("")
  };

  return (
    <form onSubmit={handleSubmit} className="form-control">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          className="form-control"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Direccion:</label>
        <input
          name="direccion"
          id="direccion"
          type="text"
          value={direction}
          className="form-control"
          onChange={({ target }) => setDirection(target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Especialidad:</label>
        <select
          name="especialidad"
          id="especialidad"
          className="custom-select"
          onChange={({ target }) => setSpecialty(target.value)}
        >
          <option value="">Seleccione una opcion</option>
          {especialidades.map((especialidad) => (
            <option value={especialidad._id} key={especialidad._id}>
              {especialidad.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Guardar Sede
        </button>
      </div>
    </form>
  );
};

export default Location;
