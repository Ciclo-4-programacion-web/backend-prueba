/* import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/authJwt')

const router = routerx();

router.post('/register', usuarioController.register);
router.get('/list', [auth.verifyToken, auth.verifyAdministrador], usuarioController.list);
router.put('/update/:id', [auth.verifyToken, auth.verifyUsuario], usuarioController.update);
router.delete('/delete/:id', [auth.verifyToken, auth.verifyUsuario], usuarioController.delete)
router.post('/login', usuarioController.login);  

module.exports = router;