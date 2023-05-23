const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

const bookTheTrip = async (req, res) => {
  const { checkIn, checkOut, numberOfPersons, phone, place, price } = req.body;
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
      user : userData.id
    });
    res.status(201).json(bookingDoc);
  })
};

module.exports = {
    bookTheTrip,
}
