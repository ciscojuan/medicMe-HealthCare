import axios from "axios";

const urlBooking = 'http://localhost:5535/api/v1/booking'
const urlUser = 'http://localhost:5535/api/v1/user'
const urlLocation = 'http://localhost:5535/api/v1/location'
const urlCredentials = 'http://localhost:5535/api/v1/credentials'

let token = null

const setToken =(newToken) => {
    const token = `Bearer ${newToken}`

}

const getBookings = () =>{
    return axios.get(urlBooking)

}

const getUser = (id) => {
    return axios.get(`${urlUser}/${id}`)
}

const getCredentials = (id) => {
    return axios.get(`${urlCredentials}/user/${id}`)
}

const getLocation= () => {
    return axios.get(urlLocation)
}

const saveCredentials = async (credentials) => {
    console.log(credentials)
    try{
        const res = await axios.post(urlCredentials, credentials)
        return res.data
    }catch(err){
        console.log(err)
    }
}

const saveUser = async (credentials) => {
    console.log(credentials)
    try {
        const res = await axios.post(urlUser, credentials)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const updateUser = async (id, credentials) =>{
    console.log(`campos para actualizar: ${JSON.stringify(credentials)} ID: ${id}`)
    try{
        const res = await axios.put(`${urlUser}/${id}`, credentials)
        return res.data
    }catch(err){
        console.log(err)
    }
}
export default {setToken, getBookings, getUser, getLocation, saveUser, updateUser, getCredentials, saveCredentials}