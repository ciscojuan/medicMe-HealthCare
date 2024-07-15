import React from 'react';
import { UilUserCircle } from '@iconscout/react-unicons'
import { UilCalendarAlt } from '@iconscout/react-unicons'
import { UilBuilding } from '@iconscout/react-unicons'
import { UilClockEight } from '@iconscout/react-unicons'
import './kpi.css';
const KPI = () => {
    return (
        <div className="kpi">
            <div className="kpi__card1">
                <UilUserCircle size="60" color="#6D30ED" />
                <label className="subtitle">1+M</label>
                <label>Usuarios</label>
            </div>
            <div className="kpi__card2">
                <UilCalendarAlt size="60" color="#6D30ED" />
                <label className="subtitle">1+M</label>
                <label>Usuarios</label>
            </div>
            <div className="kpi__card3">
                <UilBuilding size="60" color="#6D30ED" />
                <label className="subtitle">1+M</label>
                <label>Usuarios</label>
            </div>
            <div className="kpi__card4">
                <UilClockEight size="60" color="#6D30ED" />
                <label className="subtitle">1+M</label>
                <label>Usuarios</label>
            </div>
        </div>
    )
}
export default KPI;