const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //HASHING PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(StatusCodes.CREATED).json(userDoc);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
        throw new Error('Email not found')
    }
    const passOK = await bcrypt.compare(password,userDoc.password);
    if(!passOK){
        throw new Error('Credentials are invalid');
    }
    const token = jwt.sign({email:userDoc.email,id:userDoc._id},process.env.JWT_SECRET,{
        expiresIn:'3d'
    });
    res.status(StatusCodes.OK).cookie('token',token).json(userDoc);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({err : error.message})
  }
};

const profile = async (req,res) =>{
  const {token} = req.cookies;
  if(token){
     jwt.verify(token,process.env.JWT_SECRET,async (err,data)=>{
      if(err) throw err;
      const {_id,name,email} = await User.findById(data.id);
      res.status(StatusCodes.OK).json({_id,name,email});
     })
  }else{
    res.json(null);
  }
}

const logout = (req,res) =>{
    res.cookie('token','').json('Logged out');
}

module.exports = {
  register,
  login,
  profile,
  logout 
};
