const { query } = require('express');
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const { dbConexion, conexion } = require('../db/config');


const insertUser = async(req,res)=>{
    const {correo, nombre, apellidos, nickname, contrasena} = req.body;
    const validarQuery = 'SELECT * FROM usuarios WHERE ( correo = ?)'
    const insertarQuery = 'INSERT INTO usuarios (nombre, apellidos, correo, contrasena, nickname) Value(?,?,?,?,?)'
    let valores;
    try{
        let queryMysql = mysql.format(validarQuery,[correo]);
        await conexion.query(queryMysql, (err, results, fields)=>{
            if (results.length == 0) {
                queryMysql = null;
                let salt = bcrypt.genSaltSync()
                queryMysql = mysql.format(insertarQuery,[nombre, apellidos, correo, bcrypt.hashSync(contrasena,salt), nickname]);
                conexion.query(queryMysql,(err,results)=>{
                    if (err) {
                        res.status(500).json({
                            ok:false,
                            error: err,
                            msg:'Por favor hablar con la administracion'
                        });
                    }else{
                        res.status(400).json({
                            ok:true,
                            msg:'los datos han sido ingresados correctamente'
                        })
                    }
                })
            }else{
                return res.status(401).json({
                    ok: false,
                    msg:'Ya existe un usuario con ese correo'
                })
            }
        })  

    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor hablar con administracion '
        })
    }


    
}


const searchByNickname = (req,res)=>{

    const {nickname} = req.body;

    const sql = "SELECT * FROM usuarios WHERE (nickname = ?)"

    const query = mysql.format(sql,[nickname]);

    try{

        conexion.query(query,(err,results)=>{
            if (results.length == 1) {
                res.status(200).json({
                    ok:true,
                    data: results
                })
            }else{
                res.status(401).json({
                    ok:false,
                    msg:'los datos no han sido encontrados en la base de datos'
                })
            }
        })
    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor comunicarse con la administracion'
        })
    }

}

const getUsuarios =(req,res)=>{
    const sql = 'SELECT * FROM usuarios'
    try{
        conexion.query(sql,(err,results)=>{
            if (err) {
                throw new Error(err);
                return;
            }else{
                if (results.length>0) {
                    res.status(200).json({
                        ok:true,
                        data:results
                    })
                }else{
                    res.status(500).json({
                        ok:false,
                        msg:'No existen datos en la base de datos'
                    })
                }
            }
        })

    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor comunicarse con el administrador'
        })
    }

}





module.exports ={
    insertUser,
    searchByNickname,
    getUsuarios
}