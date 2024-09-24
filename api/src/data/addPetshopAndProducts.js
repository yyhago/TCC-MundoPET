const Petshop = require('../models/petshop');
const Product = require('../models/product'); 
const petshops = require('./petfood.json');

//database
require('../database');

// Função assíncrona para adicionar pet shops e produtos ao banco de dados
const addPetshopAndProducts = async () => {
  try {
    // Itera sobre cada pet shop no JSON
    for (let petshop of petshops) {
      // Cria um novo pet shop no banco de dados
      const newPetshop = await Petshop.create(petshop); 
      // Prepara os produtos para inserção, associando cada um ao pet shop
      const productsWithPetshopId = petshop.produtos.map(p => ({ ...p, petshop_id: newPetshop._id }));
      
      // Insere todos os produtos na coleção Product
      await Product.insertMany(productsWithPetshopId);
    }

    console.log('Final do script!'); 
  } catch (error) {
    console.error('Erro:', error);
  }
};

addPetshopAndProducts();
