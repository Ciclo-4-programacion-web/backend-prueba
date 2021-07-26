const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rol:[{
        type: Schema.ObjectId, 
        ref: "Rol"
    }],
    password : {
        type: String,
        required: true
    },
    telefono: {
        type: Number
    },
    imagen: {
        type: String,
        default: 'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'
    }
}, {
    collection: 'usuarios',
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Usuario', usuarioSchema)