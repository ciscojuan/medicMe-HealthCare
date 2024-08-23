import { useState } from "react";
import { useEffect } from "react";
import userService from "../../services/user";
import Notification from "../../shared/Notification";

const Location = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    userService.getSpecialty().then((res) => {
      setEspecialidades(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      name: name,
      direction: direction,
      specialty: specialty,
    };

    try {
      userService.savedLocation(newLocation).then((res) => {
        console.log(res.data);

        setTimeout(() => {
          setMessage("Sede añadida");
          setName("");
          setDirection("");
          setSpecialty("");
        }, 1000);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-control">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          id="name"
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
          {especialidades.map((especialidad) => (
            <option value={especialidad._id} key={especialidad._id}>
              {especialidad.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>

      <Notification message={message} />
    </form>
  );
};

export default Location;
