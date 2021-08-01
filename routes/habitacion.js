const routerx = require('express-promise-router')
const habitacionController = require('../controllers/HabitacionController')
const auth = require('../middlewares/authJwt')

const router = routerx()

router.post('/add', [auth.verifyToken, auth.verifyAdministrador], habitacionController.add)
router.get('/list', habitacionController.list)
router.get('/room/:id', habitacionController.room)
router.put('/update/:id', [auth.verifyToken, auth.verifyAdministrador],  habitacionController.update)
router.put('/activate/:id', [auth.verifyToken, auth.verifyAdministrador], habitacionController.activate)
router.put('/deactivate/:id', [auth.verifyToken, auth.verifyAdministrador], habitacionController.deactivate)


module.exports = router