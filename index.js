const express = require('express')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwl = require('jsonwebtoken')

app.use(express.json())

app.get('/', (req,res)=> {
    res.status(200).json({
        msg: "jnx API"
    })  
})  
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://jefreecs:${dbPassword}@cluster0.nncpcxu.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(8080)
    console.log("connected in MongoDb")
}).catch((error)=>{console.log(`Error:${error}`)})

app.listen(8080)


