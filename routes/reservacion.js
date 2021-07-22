const routerx = require('express-promise-router')
const reservacionController = require('../controllers/ReservacionController')

const router = routerx()

router.post('/add', reservacionController.add)
router.get('/list', reservacionController.list)
router.put('/update/:id', reservacionController.update)
router.delete('/delete/:id', reservacionController.delete)


module.exports = router