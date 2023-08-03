const express = require('express')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(express.json())
app.use(cors())

//models
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const User = require('./models/User')


app.get('/', (req,res)=> {
    res.status(200).json({
        msg: "jnx API"
    })  
})  


app.get("/user/:id",checkToken, async(req,res) =>{
    const id = req.params.id

    const user = await User.findById(id, "-password")

    if (!user){
        res.status(404).json({msg: 'User Not Found'})
    }
    
    res.status(200).json({user})
})

function checkToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token){
        res.status(401).json({msg: "Access Denied" })
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    }
    catch(error){
        res.status(400).json({msg: 'Access Denied'})
        console.log(`error:${error}`)
    } 
}

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
    console.log(req.body)

    if(!email || !password){
        return res.status(422).json({msg: "email or password are missing"})
    }
    if(!user){
        return res.status(404).json({mgs: "invalid email address"})
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




