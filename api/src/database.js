const mongoose = require('mongoose');
const URI = 'mongodb+srv://yyhago:Tele9815@mundopettcc.bxuhl.mongodb.net/?retryWrites=true&w=majority&appName=mundopetTCC';

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
