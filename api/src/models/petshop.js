const mongoose = require('mongoose');

// Define o esquema do Petshop
const PetshopSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  logo: { 
    type: String, 
    required: true 
  }, 
  categoria: { 
    type: String, 
    required: true 
  }, 
  destaque: { 
    type: Number, 
    required: true, 
    min: 0 
  }, 
  location: {
    lat: { 
      type: Number, 
      required: true 
    },
    lng: { 
      type: Number, 
      required: true 
    }  
  },
  recipient_id: { 
    type: String, 
    default: null 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ 
  }
});

// Cria o modelo Petshop com o esquema definido
const Petshop = mongoose.model('Petshop', PetshopSchema);
module.exports = Petshop;
