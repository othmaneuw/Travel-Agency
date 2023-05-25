const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkIn : {
        type : Date,
        required:true,
    },
    checkOut : {
        type : Date,
        required:true,
    },
    numberOfPersons : {
        type : Date,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    place : {
        type : mongoose.Types.ObjectId,
        ref : 'Place',
        required : true,
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    price : {
        required:true,
        type : Number
    },
    name : {type : String,required:true},
    status : {
        enum : {
            values : ['valid','canceled','pending'],
        }
    }
},{timestamps:true});

const BookingModel = mongoose.model('Booking',bookingSchema);

module.exports = BookingModel;