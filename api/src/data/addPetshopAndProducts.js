const Petshop = require('../models/petshop');
const Product = require('../models/product');
const petshops = require('./petfood.json');
const { createRecipient } = require('../services/paypal');

require('../database');


const addPetshopAndProducts = async () => {
    try {
        for (let petshop of petshops) {
            try {
                console.log(`\n=== Iniciando processamento do petshop: ${petshop.nome} ===`);
                

                const recipient = await createRecipient(
                    'sb-5nw6n26611614@business.example.com', // Email business do sandbox
                    petshop.nome
                );

                if (recipient.error) {
                    console.error(`❌ Erro ao criar recipient para ${petshop.nome}:`, recipient.message);
                    continue;
                }

                const newPetshop = await Petshop.create({
                    ...petshop,
                    recipient_id: recipient.data.id
                });

                const productsWithPetshopId = petshop.produtos.map(p => ({
                    ...p,
                    petshop_id: newPetshop._id
                }));

                await Product.insertMany(productsWithPetshopId);
                console.log(`✅ Petshop ${petshop.nome} e seus produtos foram cadastrados com sucesso`);

            } catch (petshopError) {
                console.error(`❌ Erro ao processar petshop ${petshop.nome}:`, petshopError);
            }
        }
    } catch (error) {
        console.error('❌ Erro geral:', error);
    }
};

addPetshopAndProducts();