const mongoose = require('mongoose');

// Define o esquema do Product
const ProductSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  capa: { 
    type: String, 
    required: true 
  }, 
  preco: { 
    type: Number, 
    required: true, 
    min: 0
  }, 
  avaliacoes: { 
    type: Number, 
    required: true, 
    min: 0, 
    default: 0 
  },
  petshop_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Petshop',
    required: true 
  }
});

// Cria o modelo Product com o esquema definido
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
