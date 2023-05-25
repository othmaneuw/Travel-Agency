const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')

const filterAccessToBookings = (req,res,next) =>{
    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
        if(err) return res.status(StatusCodes.UNAUTHORIZED).json({mssg:'error'}) ;
        const userDoc = await User.findById(userData.id);
        console.log('hello',userDoc);
        if(userDoc.name === 'othmane' || userDoc.name === 'ziyad'){
            next();
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({mssg:'error'});
        }
    })
}

module.exports = {filterAccessToBookings};