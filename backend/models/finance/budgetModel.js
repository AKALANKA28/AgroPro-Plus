const mongoose = require('mongoose');



const bp = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    crop: {
        type: String,
        required: true
    },
    startDate : {
        type : Date,
        required: true,
    },
    endDate: {
        type : Date,
        required: true,
    },
    seedsCost: {
        type : Number,
        required: true,
    },
    fertilizerCost: {
        type : Number,
        required: true,
    },
    pesticidesCost: {
        type : Number,
        required: true,
    },
    otherCost: {
        type : Number,
        required: true,
    },
    estimatedYield: {
        type : Number,
        required: true,
    },
    estimatedRevenue: {
        type : Number,
        required: true,
    },
    aseedsCost: {
        type : Number,
        required: true,
        default: 0,
    },
    afertilizerCost: {
        type : Number,
        required: true,
        default: 0,
    },
    apesticidesCost: {
        type : Number,
        required: true,
        default: 0,
    },
    aotherCost: {
        type : Number,
        required: true,
        default: 0,
    },
    actualYield: {
        type : Number,
        required: true,
        default: 0,
    },
    actualRevenue: {
        type : Number,
        required: true,
        default: 0,
    },
   
})

const budgetPlans = mongoose.model("bp", bp);

module.exports = budgetPlans;