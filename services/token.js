var jwt = require('jsonwebtoken');
const usuarioSchema = require('../models/usuario');

async function checkToken(token) {
    let __id = null;
    try {
        const { id } = await jwt.decode(token);
        __id = id;
    } catch (e) {
        return false;
    }
    console.log(__id);
    const user = await usuarioSchema.findOne({ id: __id });
    if (user) {
        const token = jwt.sign({ id: __id }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
        return { token, rol: user.rol };
    } else {
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async (payload) => {
        return jwt.sign(
            payload,
            'secretKeyToGenerateToken',
            { expiresIn: 86400 }, //24 horas
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            }
        )
    },
    //permite decodificar el token
    decode: async (token) => {
        try {
            const { id } = await jwt.verify(token, 'secretKeyToGenerateToken');
            const user = await usuarioSchema.findOne({ where: { id: id } });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}