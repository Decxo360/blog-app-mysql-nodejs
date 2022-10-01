const express = require('express');
const {conexion} = require('../db/config');
const mysql = require('mysql')
const bcrypt = require('bcryptjs');

const login= async(req,res)=>{

    const {correo,contrasena} = req.body

    console.log(req.body);

    const sql = 'SELECT * FROM usuarios WHERE(correo=?) LIMIT 1'
    const consulta = mysql.format(sql,[correo]);
    
    try{
       await conexion.query(consulta,(err,results)=>{
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
                    res.status(200).json({
                        ok:true,
                        msg:'los datos son correctos',
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

module.exports={
    login
}