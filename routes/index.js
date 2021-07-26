const routerx = require('express-promise-router');
const habitacionRouter = require('./habitacion');
const reservacionRouter = require('./reservacion');
const usuarioRouter = require('./usuario');


const router = routerx();

router.use('/habitacion', habitacionRouter);
router.use('/reservacion', reservacionRouter);
router.use('/usuario', usuarioRouter);



module.exports = router;