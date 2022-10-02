const {Router} = require('express');
const { login, insertUser } = require('../controllers/auth');
const router = Router();

router.post('/crear',insertUser);
router.get('/login',login)

module.exports= router;