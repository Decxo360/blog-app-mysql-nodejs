const express = require('express')
const jwt = require('jsonwebtoken');


const validarJwt =(req,res,next)=>{
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }

    try{
        const parameters = jwt.verify(
            token,
            process.env.SECRETSEED
        )
        req.uid = parameters.id,
        req.correo=parameters.correo

    }catch(e){
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }
    next()
}
module.exports={validarJwt}