require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const placesRoutes = require('./routes/places');
const bookingsRoutes = require('./routes/booking');
const imageDownloader = require('image-downloader');
const reviewsRoutes = require('./routes/reviews');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
       .then(res => {
        app.listen(4000,()=> console.log('Running on port 4000...'))
       })
       .catch(err => console.log(err))

app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin : 'http://localhost:3000'
}))


app.use(userRoutes);
app.use('/places',placesRoutes);
app.use('/bookings',bookingsRoutes);
app.use('/reviews',reviewsRoutes);

//Uploading photos by link
app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    console.log(link)
    const filename = Date.now()+'.jpg';
    const options = {
        url: link,
        dest: __dirname+'/uploads/'+filename
      };
      await imageDownloader.image(options);
      res.json(filename);
})

//Uploading photos
const uploadMiddleware = multer({ dest: 'uploads/' })
app.post('/upload',uploadMiddleware.array('photos',100),(req,res)=>{
   console.log(req.files);
   const uploadedPhoto = [];
   for(let i=0;i< req.files.length;i++){
    const {path,originalname} = req.files[i];
    const extension = originalname.split('.')[1];
    const newPath = path+'.'+extension;
    fs.renameSync(path,newPath);
    const filename = newPath.split('\\')[1];
    console.log(filename);
    uploadedPhoto.push(filename);
   }
   res.json(uploadedPhoto);
})

