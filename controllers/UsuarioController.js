const usuarioSchema = require('../models/usuario')
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');

module.exports = {
    register: async (req, res, next) => {
        try {
            // Form validation
            const { errors, isValid } = validateRegisterInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const register = await usuarioSchema.findOne({ email: req.body.email })

            if (register) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                const newUser = new usuarioSchema({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                if (req.body.rol) {
                    const foundRol = await Rol.find({ name: { $in: req.body.rol } })
                    newUser.rol = foundRol.map(rol => rol._id)
                } else {
                    const role = await Rol.findOne({ name: 'Usuario' })
                    newUser.rol = [role._id]
                }

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                        console.log(newUser)
                    });
                });
            }

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await usuarioSchema.find()
            if (list) {
                res.status(200).json(list);
            } else {
                res.status(404).send({//404: usuario no encontrado
                    message: 'usuarios no registrados'
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

            const reg = await usuarioSchema.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const reg = await usuarioSchema.findByIdAndRemove(req.params.id)
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },

    login: async (req, res) => {
        try {

            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const email = req.body.email;
            const password = req.body.password;

            const user = await usuarioSchema.findOne({ email }).populate("rol")


            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                            const tokenReturn = jwt.sign(
                                payload,
                                'secretKeyToGenerateToken',
                                {
                                    expiresIn: 86400 // 24 horas
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: token
                                    });
                                }
                            );
                        } else {
                            return res
                                .status(400)
                                .json({ passwordincorrect: "Password incorrect" });
                        }
                    })
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }




}