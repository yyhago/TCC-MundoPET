const Petshop = require('../models/petshop');
const Product = require('../models/product'); 
const petshops = require('./petfood.json');
const createRecipient = require('../services/paypal').createRecipient;

//database
require('../database');

// Função assíncrona para adicionar pet shops e produtos ao banco de dados
const addPetshopAndProducts = async () => {
    try {
        // Itera sobre cada pet shop no JSON
        for (let petshop of petshops) {                 // EMAIL SECUNDÁRIO BUSSINES
            const recipient = await createRecipient('sb-5nw6n26611614@business.example.com', petshop.produtos[0].nome); // Passa o nome do primeiro produto

            // Cria um novo pet shop no banco de dados
            if (!recipient.error) {
                const newPetshop = await Petshop.create({...petshop, recipient_id: recipient.data.id}); 
                // Prepara os produtos para inserção, associando cada um ao pet shop
                const productsWithPetshopId = petshop.produtos.map(p => ({ ...p, petshop_id: newPetshop._id }));
                
                // Insere todos os produtos na coleção Product
                await Product.insertMany(productsWithPetshopId);
            } else {
                console.log(recipient.message);
            }
        }

        console.log('Final do script!'); 
    } catch (error) {
        console.error('Erro:', error);
    }
};

addPetshopAndProducts();
