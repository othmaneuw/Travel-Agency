const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    trip : {
        type : mongoose.Types.ObjectId,
        ref : 'Place',
        required : true
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
},{timestamps:true});

const reviewModel = mongoose.model('Review',reviewSchema);

module.exports = reviewModel;