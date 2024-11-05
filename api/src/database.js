const mongoose = require('mongoose');
require('dotenv').config(); 
const URI = process.env.MONGODB_URI; 
console.log('URI:', URI);

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Conectado ao DB - MongoDB Atlas');
  } catch (err) {
    console.error(err);
  }
};

connectDB();
