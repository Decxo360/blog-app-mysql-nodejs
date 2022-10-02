const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const { dbConexion, conexion } = require('../db/config');


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
    searchByNickname,
    getUsuarios
}