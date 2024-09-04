const mongoose = require('mongoose');



const distribute = mongoose.Schema({

    business_name: {
        type: String,
        required: true
    },
    registation_no: {
        type: String,
        required: true
    },
    situated_place : {
        type : String,
        required: true,
        trim: true
    },
    Owner_name: {
        type : String,
        required: true,
        trim: true
    },
    email: {
        type : String,
        required: true,
        trim: true
    },
    phone_no: {
        type : String,
        required: true,
        trim: true
    },
   
})

const distributes = mongoose.model("distribute", distribute);

module.exports = distributes;