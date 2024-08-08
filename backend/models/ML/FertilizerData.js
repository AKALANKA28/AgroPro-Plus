const mongoose = require('mongoose');

const fertilizerSchema  = new mongoose.Schema({
    soil_type: {
        type: String,
        required: true
    },
    soil_ph: {
        type: Number,
    },
    nitrogen: {
        type: Number,
    },
    phosphorus: {
        type: Number,
    },
    potassium: {
        type: Number,
    },
    temperature: {
        type: Number,
    },
    rainfall: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    crop_type: {
        type: String,
    },
    planting_date: {
        type: Date,
    },
    growth_stage: {
        type: String,
    },
    previous_yields: {
        type: Number,
    },
    past_fertilizer_dates: {
        type: Date,
    },
    past_fertilizer_types: {
        type: String,
    },
    past_fertilizer_amounts: {
        type: Number,
    },
    field_size: {
        type: Number,
    },
    
});

module.exports = mongoose.model('fertilizerData', fertilizerSchema );
