const mongoose = require("mongosse")

const { Schema } = mongosse

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
        number:String,
        required: false
    }
}, {timestramps: true }
)
const Service = mongoose.model("Accounts", serviceSchema)
module.exports = {
    Accounts,
    serviceSchema
}