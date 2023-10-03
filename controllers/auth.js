const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const registro = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar el email
        const user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new User( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
        const token  = await generarJWT( dbUser.id, email );

        // Crear usuario de DB
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            email,
            token 
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const dbUser = await User.findOne({ email });

        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // Generar el JWT
        const token  = await generarJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            email: dbUser.email,
            token
        });



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response ) => {

    const { uid } = req;

    // Leer la base de datos
    const dbUser = await User.findById(uid);

    // Generar el JWT
    const token  = await generarJWT( uid, dbUser.email );

    return res.json({
        ok: true,
        uid, 
        email: dbUser.email,
        token
    });

};

module.exports = {
    registro,
    login,
    revalidarToken
}