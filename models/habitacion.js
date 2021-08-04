const mongoose = require('mongoose')
const Schema = mongoose.Schema

let habitacionSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String,
        default: "https://pmcasa.com/wp-content/uploads/2019/08/importancia-iluminacion-habitacion-decoracion-1024x575.jpg"
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