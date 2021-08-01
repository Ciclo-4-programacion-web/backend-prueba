const habitacionSchema = require('../models/habitacion')


module.exports = {
    add: async (req, res, next) => {
        try {
            const reg = await habitacionSchema.create(req.body)
            res.status(200).json(reg);
            console.log(reg)

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    room: async (req, res, next) => {
        try {
            const reg = await habitacionSchema.findById(req.params.id) 
            if (reg) {
                res.status(200).json(reg);
            } else {
                res.status(404).send({//404: usuario no encontrado
                    message: 'Habitacion no encontrada'
                })
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await habitacionSchema.find()
            if (list) {
                res.status(200).json(list);
            } else {
                res.status(404).send({//404: usuario no encontrado
                    message: 'Habitaciones no registradas'
                })
            }
        } catch (error) {
            res.status(500).send({ //500 error con el servidor
                message: 'Error -> servidor'
            })
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            await habitacionSchema.findByIdAndUpdate(req.params.id, {
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
    activate: async (req, res, next) => {
        try {
            const activate = await habitacionSchema.findByIdAndUpdate(req.params.id, {
                $set:{state: true}
            }, (error, data)=>{
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
    deactivate: async (req, res, next) => {
        try {
            const activate = await habitacionSchema.findByIdAndUpdate(req.params.id, {
                $set:{state: false}
            }, (error, data)=>{
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
    }

}