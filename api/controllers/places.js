const Place = require('../models/Place');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const addPlace = async (req,res) =>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async (err,data)=>{
            if(err){
                res.status(500).send('Sorry , but the token is invalid');
            }
            const userDoc = await User.findById(data.id);
            const placeDoc = await Place.create({
                owner : userDoc._id,
                ...req.body
            })
            res.status(201).json(placeDoc);
        })
    }else{
        res.status(500).send('Token not found');
    }
}

const ShowPlacesByUser = async (req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,data)=>{
        const places = await Place.find({owner : data.id});
        res.status(200).json(places);
    })
}

module.exports = {
    addPlace,
    ShowPlacesByUser,
}