
import express from 'express'
//require('dotenv').config()
import 'dotenv/config'
import cors from 'cors'

import routerAuth from "./routes/auth.js";
import { dbConnection } from './database/config.js';
import routerEvent from './routes/events.js';




//Create el servidor de express

const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo
app.use(express.json())

//Rutas
app.use('/api/auth', routerAuth)
app.use('/api/events', routerEvent)


// CRUD: eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})