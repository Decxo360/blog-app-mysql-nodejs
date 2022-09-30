const express = require('express');
const { dbConexion } = require('./db/config');
require('dotenv').config();



const app = express();
app.use(express.json()); 

app.use(express.static('public'));

dbConexion();

app.use('/api/users',require('./router/usuario'))

app.listen(process.env.PORT,function(){
    console.log(`puerto libre en ${this.address().port}`)
})
