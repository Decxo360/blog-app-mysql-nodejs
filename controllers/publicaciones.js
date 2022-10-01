const express = require('express');
const {conexion} = require('../db/config');
const mysql = require('mysql');


const obtenerPublicaciones = async (req,res)=>{
    const sql = 'SELECT * FROM publicaciones'
    try{        
        await conexion.query(sql,(err,results)=>{
            if (err) {
                res.status(401).json({
                    ok:false,
                    msg:'Ha ocurrido algun error, hablar con administracion'
                })
            }else{
                res.status(400).json({
                    ok:true,
                    data:results
                })
            }
        })
    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor hablar con administracion'
        })
    }
}

const obtenerPublicacionByTitulo = (req,res)=>{

    const {titulo} = req.body
    const sql = 'SELECT * FROM publicaciones WHERE(titulo = ?)'
    const consulta = mysql.format(sql,[titulo])

    try{
        conexion.query(consulta,(err,results)=>{
            if (err) {
                throw new Error(err)
            }else{
                if (results.length > 0 ) {
                    res.status(400).json({
                        ok:true,
                        data:results
                    })
                }else{
                    res.status(401).json({
                        ok:false,
                        msg:'No existen datos relacionados'
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

const crearPublicacion =(req,res)=>{

    const {titulo,subtitulo,descripcion,idusuario} = req.body
    const sql = 'INSERT INTO publicaciones (titulo,subtiulo,descripcion,idusuario) Value(?,?,?,?)'
    const consulta = mysql.format(sql,[titulo,subtitulo,descripcion,idusuario]);

    try{

        conexion.query(consulta,(err,results)=>{
            if (err) {
                throw new Error(err);
                return;
            }else{
                res.status(200).json({
                    ok:true,
                    msg:'Los datos han sido guardados exitosamente'
                })
            }
        })  
    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Por favor hablar con administracion'
        })
    }

}

module.exports={
    obtenerPublicaciones,
    obtenerPublicacionByTitulo,
    crearPublicacion
}