const jwt = require('jsonwebtoken')
const User = require('../models/usuario')
const Rol = require('../models/rol')

module.exports = {
    verifyToken: async(req, res, next) => {
        try {
            const token = req.headers.token
            if (!token) {
                return res.status(403).send({
                    message: 'No token'
                });
            }
            const decoded = jwt.verify(token, 'secretKeyToGenerateToken')
            req.userId = decoded.id

            const user = await User.findById(req.userId, {password: 0})
            if(!user)return res.status(404).json({message : 'No user found'})
    
            next()
        } catch (error) {
            return res.status(500).send({
                message: 'Ocurrió un error'
            });
        }
    },
    verifyUsuario: async(req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Rol.find({_id: {$in: user.rol}})

        for (const property of roles) {
            if(property.name === 'Usuario' || property.name === 'Admin'){
                next()
                return
            }
        }
        return res.status(403).json({message: 'Required User'})

    },
    verifyAdministrador: async(req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Rol.find({_id: {$in: user.rol}})

        for (const property of roles) {
            if(property.name === 'Admin'){
                next()
                return
            }
        }
        
        return res.status(403).json({message: 'Required Admin'})
    },
}