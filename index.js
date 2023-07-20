const express = require('express')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

//models
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const User = require('./models/User')


app.get('/', (req,res)=> {
    res.status(200).json({
        msg: "jnx API"
    })  
})  

//account register
app.post('/auth/register', async (req,res)=> {

    const {name, email, password, confirmPassword} = req.body

    if(!name || !email || !password || !confirmPassword){
        res.status(422).json({mgs: 'Some fields are missing'})
    }
    if(password != confirmPassword){
        res.status(422).json({mgs: 'passwords are not matching'})
    }

    const userExist = await User.findOne({email: email})

    if(userExist){
       res.status(422).json({msg:'email already used'}) 
    }
    
    const salt = await bcrypt.genSalt(12)
    const pwHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: pwHash,
    })

    try{
        await user.save()

        res.status(201).json({mgs: "account created successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            mgs: 'Have not created account :/'
        })
    }
})
//account login
app.post('/auth/login', async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if(!email || !password){
        res.status(422).json({msg: "email or password are missing"})
    }
    if(!user){
        res.status(404).json({mgs: "invalid email address"})
    }
    const checkPass = await bcrypt.compare(password, user.password)
    if(!checkPass){
        res.status(422).json({msg:"invalid password"})
    }

    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        },
        secret)
        res.status(200).json({msg:"auth sucess", token})
    }
    catch(error){console.log(`error:${error}`)}


})


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.nncpcxu.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(8080)
    console.log("connected in MongoDb")
}).catch((error)=>{console.log(`Error:${error}`)})




