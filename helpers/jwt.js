const jwt = require('jsonwebtoken')


const generarJWT = (id,correo) =>{
   return new Promise((resolve,reject)=>{
    jwt.sign({id,correo},process.env.SECRETSEED,{
        expiresIn:'24h'
    },(err,token)=>{
        if (err) {
            console.log(err)
            reject('no se pudo generar el token')
        }
        resolve(token)
    })
   })
} 

module.exports={generarJWT}