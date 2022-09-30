const {Router} = require('express');
const { obtenerPublicaciones, obtenerPublicacionByTitulo } = require('../controllers/publicaciones');
const router = Router();



router.get('/all', obtenerPublicaciones);
router.get('/buscarxtitulo', obtenerPublicacionByTitulo);

module.exports = router
