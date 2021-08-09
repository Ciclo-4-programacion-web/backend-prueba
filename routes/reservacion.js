const routerx = require('express-promise-router')
const reservacionController = require('../controllers/ReservacionController')
const auth = require('../middlewares/authJwt')

const router = routerx()

router.post('/add', [auth.verifyToken, auth.verifyUsuario], reservacionController.add)
router.get('/list', [auth.verifyToken, auth.verifyAdministrador], reservacionController.list)
router.get('/list/:id', [auth.verifyToken, auth.verifyUsuario], reservacionController.listReservationID)
router.put('/update/:id', [auth.verifyToken, auth.verifyUsuario], reservacionController.update)
router.delete('/delete/:id', [auth.verifyToken, auth.verifyUsuario], reservacionController.delete)


module.exports = router