import { request, response } from 'express'
import bcrypt from 'bcryptjs'
import { generarJWT } from '../helpers/jwt.js'
import { Usuario } from '../models/Usuario.js'





export const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)


        await usuario.save()

        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name)




        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el ADministrador'
        })
    }



}

export const loginUsuario = async (req = request, res = response) => {



    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar contraseña
        const validPassword = bcrypt.compareSync(
            password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta'
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el ADministrador'
        })
    }





}

export const revalidarToken = async (req = request, res = response) => {

    const { uid, name } = req

    const token = await generarJWT(uid, name)
    res.json({
        ok: true,
        token
    })

}



