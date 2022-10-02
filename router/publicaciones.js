const {Router} = require('express');
const { obtenerPublicaciones, obtenerPublicacionByTitulo, crearPublicacion, eliminarPublicacion, obtenerPublicacionesXIdUsuario } = require('../controllers/publicaciones');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.use(validarJwt)

router.get('/all', obtenerPublicaciones);
router.get('/buscarxtitulo', obtenerPublicacionByTitulo);
router.post('/crear',crearPublicacion);
router.delete('/eliminar',eliminarPublicacion);
router.get('/:idusuario', obtenerPublicacionesXIdUsuario);

module.exports = router
