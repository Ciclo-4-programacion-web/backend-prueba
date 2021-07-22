const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require('morgan')
let dbConfig = require("./database/db");
const app = express();

const habitacion = require('./routes/habitacion')
const reservacion = require('./routes/reservacion')

// Setting
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/habitacion', habitacion)
app.use('/reservacion', reservacion)
// Static files

// Starting the server
mongoose.Promise = global.Promise;
mongoose
    .connect(dbConfig.db, {
        useNewUrlParser: true,
    })
    .then(
        () => {
            console.log("Database sucessfully connected!");
        },
        (error) => {
            console.log("Could not connect to database : " + error);
        }
    )

if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port') + ' on dev');
    });
}

module.exports = app;