const Rol = require('../models/rol')

module.exports = {
    createRoles: async() => {
        try {
            const count = await Rol.estimatedDocumentCount()

            if (count > 0) return

            const values = await Promise.all([
                new Rol({ name: 'Usuario' }).save(),
                new Rol({ name: 'Admin' }).save()

            ])
            console.log(values)
        } catch (error) {
            console.error(error)
        }



    }
}