import express from 'express'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/events.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { isDate } from '../helpers/isDate.js'
const routerEvent = express.Router()



//validar por jwt
routerEvent.use(validarJWT)

//Obtener eventos
routerEvent.get('/', getEventos)


//crear evento
routerEvent.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    // check('start').isDate().withMessage('No es una fecha válida'),
    check('start', 'La fecha inicio es obligatorio').custom(isDate),
    check('end', 'La fecha fin es obligatorio').custom(isDate),
    validarCampos
], crearEvento)

//actualiza evento
routerEvent.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    // check('start').isDate().withMessage('No es una fecha válida'),
    check('start', 'La fecha inicio es obligatorio').custom(isDate),
    check('end', 'La fecha fin es obligatorio').custom(isDate),
    validarCampos
], actualizarEvento)

//borrar evento
routerEvent.delete('/:id', eliminarEvento)

export default routerEvent;