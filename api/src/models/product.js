const mongoose = require('mongoose');

// Define o esquema do Product
const ProductSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    trim: true // Remove espaços em branco
  }, 
  capa: { 
    type: String, 
    required: true 
  }, 
  preco: { 
    type: Number, 
    required: true, 
    min: 0 // Preço não pode ser negativo
  }, 
  avaliacoes: { 
    type: Number, 
    required: true, 
    min: 0, // Avaliações não podem ser negativas
    default: 0 // Valor padrão para evitar inconsistências
  },
  petshop_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Petshop', // Faz referência ao modelo `Petshop`
    required: true 
  }
});

// Cria o modelo Product com o esquema definido
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
