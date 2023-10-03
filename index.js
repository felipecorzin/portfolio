const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();


// Directorio Público
app.use( express.static('public') );

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json({ limit: '10mb' }));
app.use( express.urlencoded({ extended: true, limit: '10mb' }));


// Rutas
app.use('/api/auth', require('./routes/auth'));
//app.use( '/api/user', require('./routes/user'));
app.use('/api/correo', require('./routes/correo'));

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});