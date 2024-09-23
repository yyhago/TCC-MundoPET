const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mundopet'; // Certifique-se de que o URI esteja correto

mongoose.set('debug', true);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Conectado ao DB - localhost');
  } catch (err) {
    console.error(err);
  }
};
connectDB();
