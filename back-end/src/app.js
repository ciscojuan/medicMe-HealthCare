'use strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

app.use(express.json());

//cargar rutas
const api = proccess.env.API_URL;
const PORT = process.env.PORT || 6533;
const MOGODB_URI = proccess.env.MONGO_URI;
//middlewares
const app = express();

//conexion

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})