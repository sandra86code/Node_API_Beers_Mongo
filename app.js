const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express()

const cervezas = require('./routes/cervezas')
const bares = require('./routes/bares')
const usuarios = require('./routes/usuarios')

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/cervezas', cervezas)
app.use('/bares', bares)
app.use('/usuarios', usuarios)


app.listen(process.env.PORT)