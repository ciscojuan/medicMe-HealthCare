import React from "react";
import { UilUserCircle } from "@iconscout/react-unicons";
import { UilCalendarAlt } from "@iconscout/react-unicons";
import { UilBuilding } from "@iconscout/react-unicons";
import { UilClockEight } from "@iconscout/react-unicons";
import "./kpi.css";
const KPI = () => {
  return (
    <div className="kpi">
      <div className="kpi__card a">
        <UilUserCircle size="60" color="#6D30ED" />
        <label className="kpi__car--subtitle a">1+M</label>
        <label>Usuarios</label>
      </div>
      <div className="kpi__card b">
        <UilCalendarAlt size="60" color="#D0176C" />
        <label className="kpi__car--subtitle b">1+M</label>
        <label>Citas médicas</label>
      </div>
      <div className="kpi__card c">
        <UilBuilding size="60" color="#6D30ED" />
        <label className="kpi__car--subtitle c">1+M</label>
        <label>Sedes</label>
      </div>
      <div className="kpi__card d">
        <UilClockEight size="60" color="#6D30ED" />
        <label className="kpi__car--subtitle d">1+M</label>
        <label>24 Horas Disponibles</label>
      </div>
    </div>
  );
};
export default KPI;
