const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

const bookTheTrip = async (req, res) => {
  const { checkIn, checkOut, numberOfPersons, phone, place, price,name } = req.body;
  const {token} = req.cookies;
  jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
    if(err) throw err;
    const bookingDoc = await Booking.create({
      checkIn,
      checkOut,
      numberOfPersons,
      phone,
      price,
      place,
      user : userData.id,
      name
    });
    res.status(201).json(bookingDoc);
  })
};

const getBookingsByUser = async (req,res) =>{
  const {token} = req.cookies;
  console.log(token);
  jwt.verify(token,process.env.JWT_SECRET,{},async (err,userData)=>{
     if(err) throw err;
     console.log('We re good');
     const bookingsDoc = await Booking.find({user : userData.id}).populate('place');
     res.status(200).json(bookingsDoc);
  });
}

module.exports = {
    bookTheTrip,
    getBookingsByUser,
}
