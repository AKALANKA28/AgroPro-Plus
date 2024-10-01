const mongoose = require('mongoose');



const stock = mongoose.Schema({

    ferti_name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type : Number,
        required: true,
        trim: true
    },
    description: {
        type : String,
        required: true,
        trim: true
    },
    availability: {
        type : String,
        required: true,
        trim: true
    },
    
   
})

const stocks = mongoose.model("stock", stock);

module.exports = stocks;