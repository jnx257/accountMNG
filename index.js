const express = require('express')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwl = require('jsonwebtoken')

app.use(express.json())

//models

const User = require('./models/User')


app.get('/', (req,res)=> {
    res.status(200).json({
        msg: "jnx API"
    })  
})  
app.post('/auth/register', async (req,res)=> {

    const {name, email, password, confirmPassword} = req.body

    if(!name || !email || !password || !confirmPassword){
        res.status(422).json({mgs: 'Some fields are missing'})
    }
    if(password != confirmPassword){
        res.status(422).json({mgs: 'passwords are not matching'})
    }
    else res.status(200).json({mgs: 'passed'})

})
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.nncpcxu.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(8080)
    console.log("connected in MongoDb")
}).catch((error)=>{console.log(`Error:${error}`)})




