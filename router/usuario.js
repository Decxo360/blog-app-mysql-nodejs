const {Router} = require('express');
const { insertUser, searchByNickname, getUsuarios } = require('../controllers/usuarios');
const router = Router();



router.post('/crear',insertUser);
router.get('/buscar',searchByNickname);
router.get('/all',getUsuarios)



module.exports = router