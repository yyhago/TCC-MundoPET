// Importando os modelos e funções necessárias
const Petshop = require('../models/petshop'); // Modelo Petshop para interagir com a coleção de petshops no banco de dados
const Product = require('../models/product'); // Modelo Product para interagir com a coleção de produtos no banco de dados
const petshops = require('./petfood.json'); // Arquivo JSON contendo a lista de petshops e seus respectivos produtos
const { createRecipient } = require('../services/paypal'); // Função para criar um recipient no PayPal

// Requerendo a conexão com o banco de dados
require('../database');

// Função assíncrona para adicionar petshops e seus produtos ao banco de dados
const addPetshopAndProducts = async () => {
    try {
        // Iterando sobre todos os petshops no arquivo JSON 'petshops'
        for (let petshop of petshops) {
            try {
                console.log(`\n=== Iniciando processamento do petshop: ${petshop.nome} ===`);

                // Criando um recipient no PayPal para o petshop, utilizando seu e-mail e nome
                const recipient = await createRecipient(
                    petshop.email,
                    petshop.nome
                );

                // Verificando se ocorreu algum erro ao criar o recipient no PayPal
                if (recipient.error) {
                    console.error(`❌ Erro ao criar recipient para ${petshop.nome}:`, recipient.message);
                    continue; // Se ocorrer erro, pula para o próximo petshop na lista
                }

                // Criando o petshop no banco de dados, incluindo o 'recipient_id' retornado pela API do PayPal
                const newPetshop = await Petshop.create({
                    ...petshop, // Espalha as propriedades do petshop original
                    recipient_id: recipient.data.id // Adiciona o ID do recipient no objeto do petshop
                });

                // Mapeando os produtos do petshop e associando o 'petshop_id' com o ID do petshop recém-criado
                const productsWithPetshopId = petshop.produtos.map(p => ({
                    ...p, // Espalha as propriedades de cada produto
                    petshop_id: newPetshop._id // Associa o petshop_id ao produto
                }));

                // Inserindo os produtos no banco de dados
                await Product.insertMany(productsWithPetshopId);
                console.log(`✅ Petshop ${petshop.nome} e seus produtos foram cadastrados com sucesso`);

            } catch (petshopError) {
                // Caso ocorra algum erro no processamento de um petshop, exibe a mensagem de erro
                console.error(`❌ Erro ao processar petshop ${petshop.nome}:`, petshopError);
            }
        }
    } catch (error) {
        // Captura de erro geral, caso ocorra algum problema fora do loop dos petshops
        console.error('❌ Erro geral:', error);
    }
};

// Chamando a função para iniciar o processo de adicionar os petshops e produtos
addPetshopAndProducts();
