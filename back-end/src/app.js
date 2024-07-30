'use strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger.config.js');
// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const userRoutes = require('./routes/user');
const medicRoutes = require('./routes/medic');
const locationRoutes = require('./routes/location');
const patientRoutes = require('./routes/patient');
const bookingRoutes = require('./routes/booking');
const LoginRoute = require('./routes/login');

const PORT = process.env.PORT || 6533;
const MONGODB_URI = process.env.MONGODB_URI;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

//cargar rutas
const api = '/api/v1'

app.use(`${api}/user`, userRoutes);
app.use(`${api}/medic`, medicRoutes);
app.use(`${api}/location`, locationRoutes);
app.use(`${api}/patient`, patientRoutes);
app.use(`${api}/booking`, bookingRoutes);
app.use(`${api}/login`, LoginRoute);



//conectar a la base de datos
mongoose.connect(MONGODB_URI)
  .then(() => console.log("You have connected to the database successfully."))
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})