const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Habitacion = mongoose.model('Habitacion');

let reservacionSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject:{
        type: String
    },
    habitacion:{
        type: Schema.ObjectId, ref: "Habitacion" 
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    }
}, {
    collection: 'reservaciones'
})
module.exports = mongoose.model('Reservacion', reservacionSchema)