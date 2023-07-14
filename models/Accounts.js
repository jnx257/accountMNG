const mongoose = require("mongoose")

const { Schema } = mongoose

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate:{
        type: Date,
        require:true 
    },
    CPF:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    pfpImg:{
        type:String,
        required: true
    },
    phoneNumber:{
        number:String
    }
}, {timestramps: true }
)
const Accounts = mongoose.model("Accounts", serviceSchema)
module.exports = {
    Accounts,
    serviceSchema
}