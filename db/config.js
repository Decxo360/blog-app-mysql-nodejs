const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBNAME,
})

const dbConexion= async ()=>{
    await conexion.connect(err=>{
        if (err) {
            throw new Error
        }
        console.log('conectado a la base de datos')
    })
}

module.exports={
    dbConexion
}
