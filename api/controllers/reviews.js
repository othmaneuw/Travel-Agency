const Review = require('../models/Review');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');

const addReview = async (req,res) =>{
    const {body,trip} = req.body;
    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({mssg : "couldn't add review , you must sign in first"});
        const reviewDoc = await Review.create({
            user : userData.id,
            trip : trip._id,
            body,
            status : 'pending'
        });
        res.status(StatusCodes.CREATED).json(reviewDoc);
    })   
}

module.exports = {
    addReview,
}