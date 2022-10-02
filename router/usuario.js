const {Router} = require('express');
const { insertUser, searchByNickname, getUsuarios } = require('../controllers/usuarios');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();


router.use(validarJwt)

router.get('/buscar',searchByNickname);
router.get('/all',getUsuarios)



module.exports = router