const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require('morgan')
let dbConfig = require("./database/db");
const path = require('path')
const passport = require("passport");
const router = require('./routes')
const auth = require('./libs/roles')


const app = express();
auth.createRoles()

// Setting
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/api', router)
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