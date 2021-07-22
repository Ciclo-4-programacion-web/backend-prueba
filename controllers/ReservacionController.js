const reservacionSchema = require('../models/reserva')
const habitacionSchema = require('../models/habitacion')


module.exports = {
    add: async (req, res, next) => {
        try {
            const reg = await reservacionSchema.create(req.body)
            res.status(200).json(reg);
            console.log(reg)

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }


    },
    list: async (req, res, next) => {
        try {
            const list = await reservacionSchema.find({}, function (err, libros) {
                habitacionSchema.populate(libros, { path: "habitacion" }, function (err, libros) {
                  res.status(200).send(libros);
                });
              })
        } catch (error) {
            res.status(500).send({ //500 error con el servidor
                message: 'Error -> servidor'
            })
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            await reservacionSchema.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, (error, data) => {
                if (error) {
                    return next(error);
                    console.log(error)
                } else {
                    res.json(data)
                    console.log('Room updated successfully !')
                }
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const activate = await reservacionSchema.findByIdAndRemove(req.params.id, {
                $set:{state: true}
            }, (error, data)=>{
                if (error) {
                    return next(error);
                    console.log(error)
                } else {
                    res.json(data)
                    console.log('Reservation eliminated !')
                }
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }

}