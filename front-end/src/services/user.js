import axios from "axios";

const urlBooking = 'http://localhost:5535/api/v1/booking'
const urlPatient = 'http://localhost:5535/api/v1/patient'
const urlMedic = 'http://localhost:5535/api/v1/medic'
const urlLocation = 'http://localhost:5535/api/v1/location'

let token = null

const setToken =(newToken) => {
    const token = `Bearer ${newToken}`

}

const getBookings = () =>{
    return axios.get(urlBooking)

}

const getPatient = (id) => {
    return axios.get(`${urlPatient}/${id}`)
}

const getMecis = () => {
    return axios(urlMedic)
}

const getLocation= () => {
    return axios(urlLocation)
}

export default {setToken, getBookings, getPatient, getLocation, getMecis}