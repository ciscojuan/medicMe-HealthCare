// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MedicMe - HealthCare documentada con Swagger',
            version: '1.0.0',
            description: 'Documentacion de rutas con Swagger',
        },
    },
    apis: ['./routes/*.js'], // archivos donde están tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};