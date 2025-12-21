import path, { dirname } from 'path'
import express from 'express'
//require('dotenv').config()
import 'dotenv/config'
import cors from 'cors'

import routerAuth from "./routes/auth.js";
import { dbConnection } from './database/config.js';
import routerEvent from './routes/events.js';
import { fileURLToPath } from 'url';




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

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


// CRUD: eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})