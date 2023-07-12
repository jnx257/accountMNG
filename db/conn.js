const mongoose = require('mongoose')
async function main (){
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect('mongodb+srv://jefreecs:kRU7FiHoyxlGwTXd@cluster0.nncpcxu.mongodb.net/?retryWrites=true&w=majority')
        console.log("connected in mongoose")
    }
    catch(error){
        console.log(`Error:${error}`)
    }
}

module.exports = main
