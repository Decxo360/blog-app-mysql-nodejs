const {Router} = require('express');
const { obtenerPublicaciones, obtenerPublicacionByTitulo, crearPublicacion } = require('../controllers/publicaciones');
const router = Router();

router.get('/all', obtenerPublicaciones);
router.get('/buscarxtitulo', obtenerPublicacionByTitulo);
router.post('/crear',crearPublicacion);

module.exports = router
