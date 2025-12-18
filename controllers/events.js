import { request, response } from "express"
import { Evento } from "../models/Evento.js"


export const getEventos = async (req = request, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name')

    res.status(200).json({
        ok: true,
        eventos
    })




}

export const crearEvento = async (req = request, res = response) => {

    const evento = new Evento(req.body)
    try {

        evento.user = req.uid
        const eventoGuardado = await evento.save()



        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        })

    }



}

export const actualizarEvento = async (req = request, res = response) => {

    const eventoId = req.params.id

    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar el evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado =
            await Evento.findByIdAndUpdate(eventoId,
                nuevoEvento, { new: true })



        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador!'
        })

    }






}

export const eliminarEvento = async (req = request, res = response) => {


    const eventoId = req.params.id

    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar el evento'
            })
        }



        await Evento.findByIdAndDelete(eventoId)

        res.status(200).json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador!'
        })

    }



}
