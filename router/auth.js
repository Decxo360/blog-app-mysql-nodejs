const {Router} = require('express');
const passport = require('passport');
const { login, insertUser, socialGit } = require('../controllers/auth');
const router = Router();

router.post('/crear',insertUser);
router.get('/login',login)
router.get('/social/github', passport.authenticate('github',{scope:['user:email']}))
router.get('social/github/callback', passport.authenticate('github',{failureRedirect:'/login'}),
(req,res)=>{
    res.redirect('/')
})
module.exports= router;