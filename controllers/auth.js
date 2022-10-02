const express = require('express');
const {conexion} = require('../db/config');
const mysql = require('mysql')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT');

const login= async(req,res)=>{

    const {correo,contrasena} = req.body



    const sql = 'SELECT * FROM usuarios WHERE(correo=?) LIMIT 1'
    const consulta = mysql.format(sql,[correo]);
    
    try{
       await conexion.query(consulta,async(err,results)=>{
            if (err) {
                throw new Error(err)
            }else{
                const validPass = bcrypt.compareSync(contrasena, results[0].contrasena)
                if (!validPass) {
                    res.status(401).json({
                        ok:false,
                        msg:'los datos no son correctos'
                    })
                }else{
                    const token = await generarJWT(results[0].idusuario,results[0].correo);
                    res.status(200).json({
                        ok:true,
                        msg:'los datos son correctos',
                        token,
                        nombre:results[0].nombre,
                        apellidos:results[0].apellidos,
                        correo:results[0].correo,
                        nickname:results[0].nickname,
                        id:results[0].idusuario
                    })
                }
            }
        })
    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor hablar con administracion'
        })
    }

}

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

module.exports={
    login,
    insertUser
}