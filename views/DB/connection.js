const mongoose = require('mongoose');
const url = "mongodb+srv://varshneyprakharpv0207:prakhar@cluster0.ytg3x2l.mongodb.net/";

mongoose.connect(url)
.then(() => {
  
  console.log('MongoDB connected');
})
.catch(err => console.error(err));