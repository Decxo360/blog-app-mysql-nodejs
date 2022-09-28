const { query } = require('express');
const express = require('express');
const dbConexion = require('../db/config');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');


const crearUsuario = async(conecction,req,res)=>{

    const {email, nombre, apellidos, nickname, password} = req.body;

    const validarQuery = 'SELECT * FROM usuarios WHERE ( email = ?)'
    const insertarQuery = 'INSERT INTO usuarios (nombre, apellidos, correo, contrasena, nickname) Value(?,?,?,?,?)'

    try{

        let query = mysql.format(validarQuery,[email]);
        
        await connection.query(validarQuery, (err,result)=>{
            if (err) throw Error;
            callback(result)
        })

        if (query) {
            return res.status(401).json({
                ok: false,
                msg:'Ya existe un usuario con ese correo'
            })
        }

        let salt = bcrypt.genSaltSync()
        
        query = mysql.format(insertarQuery,[nombre, apellidos, email, bcrypt.hashSync(password,salt), nickname]);
        await conecction.query(validarQuery,(err,result)=>{
            if (err) throw Error;
            callback(result)
        })  

    }catch(e){

    }


    
}