const mongoose = require('mongoose')
const Schema = mongoose.Schema

let habitacionSchema = new Schema({
    name: {
        type: String
    },
    type:{
        type: String
    },
    ubication:{
        type: String
    },
    room_number:{
        type: Number
    },
    state: {
        type: Boolean
    },
    price: {
        type: Number
    }

}, {
    collection: 'habitaciones'
})
module.exports = mongoose.model('Habitacion', habitacionSchema)