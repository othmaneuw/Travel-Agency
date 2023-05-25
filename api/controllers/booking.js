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
      name,
      status : 'pending'
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
     const bookingsDoc = await Booking.find({user : userData.id,status:'valid'}).populate('place');
     res.status(200).json(bookingsDoc);
  });
}

const getAllBooking = async (req,res) =>{
  res.status(200).json(await Booking.find({}).populate('place').populate('user'));
}

const updateBookingStatus = async (req,res) =>{
  const {id} = req.params;
  console.log(id);
  const bookingDoc = await Booking.findByIdAndUpdate({_id:id},{status:'valid'},{new:true}).populate('user').populate('place');
  res.status(200).json(bookingDoc);
}

module.exports = {
    bookTheTrip,
    getBookingsByUser,
    getAllBooking,
    updateBookingStatus
}
