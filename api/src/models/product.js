const mongoose = require('mongoose'); 

// Define o esquema do Product
const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true }, 
  capa: { type: String, required: true }, 
  preco: { type: Number, required: true }, 
  avaliacoes: { type: Number, required: true },
  petshop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Petshop', required: true } 
});

// Cria o modelo Product com o esquema definido
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product; 
