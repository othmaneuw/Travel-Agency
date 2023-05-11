const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
    checkIn : String,
    checkOut : String,
    maxGuests : Number
})

const placeModel = mongoose.model('Place',placeSchema);

module.exports = placeModel;