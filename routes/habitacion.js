const routerx = require('express-promise-router')
const habitacionController = require('../controllers/HabitacionController')

const router = routerx()

router.post('/add', habitacionController.add)
router.get('/list', habitacionController.list)
router.put('/update/:id', habitacionController.update)
router.put('/activate/:id', habitacionController.activate)
router.put('/deactivate/:id', habitacionController.deactivate)


module.exports = router