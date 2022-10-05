const passport = require('passport');
const git = require('passport-github').Strategy;

const {conexion} = require('../db/config')
const mysql = require('mysql')

passport.use(new git({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: procces.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:50717/api/auth/social/github/callback'
}), (profile, done) => {
    console.log(profile);
    mysql.query(`SELECT * FROM usuarios WHERE(correo = ${profile.email})`,(err,result)=>{
        console.log(result);
    })
})