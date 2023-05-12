require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const imageDownloader = require('image-downloader');
const mongoose = require('mongoose');

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

