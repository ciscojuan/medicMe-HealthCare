import axios from "axios";

const urlBooking = "https://api-medicme-healthcare.onrender.com/api/v1/booking";
const urlUser = "https://api-medicme-healthcare.onrender.com/api/v1/user";
const urlCredentials =
  "https://api-medicme-healthcare.onrender.com/api/v1/credentials";
const urlSpecialty = "https://api-medicme-healthcare.onrender.com/api/v1/specialty";
const urlLocation = "https://api-medicme-healthcare.onrender.com/api/v1/location";

let token = null;

const setToken = (newToken) => {
  const token = `Bearer ${newToken}`;
};
const getSpecialty = () => {
  return axios.get(urlSpecialty);
};

const getLocations = () => {
  return axios.get(urlLocation);
};

const getBookings = (id) => {
  return axios.get(`${urlBooking}/user/${id}`);
};

const getAllBookings = () => {
  return axios.get(`${urlBooking}`);
};

const deleteBooking = (id) => {
  return axios.delete(`${urlBooking}/${id}`);
};

const getUsers = () => {
  return axios.get(`${urlUser}`);
};
const getUser = (id) => {
  return axios.get(`${urlUser}/${id}`);
};

const getUserFromCredential = (id) => {
  return axios.get(`${urlUser}/credential/${id}`);
};

const getCredentials = (id) => {
  return axios.get(`${urlCredentials}/${id}`);
};

const saveCredentials = async (credentials) => {
  console.log(credentials);
  try {
    const res = await axios.post(urlCredentials, credentials);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const saveBooking = async (data) => {
  try {
    const res = await axios.post(urlBooking, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateBooking = async (id, data) => {
  console.log(`campos para actualizar: ${JSON.stringify(data)} ID: ${id}`);
  try {
    const res = await axios.put(`${urlBooking}/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const saveUser = async (credentials) => {
  console.log(credentials);
  try {
    const res = await axios.post(urlUser, credentials);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id, credentials) => {
  console.log(
    `campos para actualizar: ${JSON.stringify(credentials)} ID: ${id}`
  );
  try {
    const res = await axios.put(`${urlUser}/${id}`, credentials);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getDoctors = () => {
  return axios.get(`${urlUser}/doctors`);
};
export default {
  setToken,
  getBookings,
  getAllBookings,
  deleteBooking,
  saveBooking,
  updateBooking,
  getUser,
  getUsers,
  getDoctors,
  saveUser,
  updateUser,
  getCredentials,
  saveCredentials,
  getUserFromCredential,
  getSpecialty,
  getLocations,
};
