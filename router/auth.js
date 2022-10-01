const {Router} = require('express');
const { login } = require('../controllers/auth');
const router = Router();

router.get('/login',login)

module.exports= router;