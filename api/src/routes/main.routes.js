// Importação de bibliotecas e dependências necessárias
require("dotenv").config();

const express = require("express");
const axios = require("axios");
const router = express.Router();

// Importação dos modelos de dados
const PetShop = require("../models/petshop");
const Product = require("../models/product");

// Importação de serviços
const { createSplitTransaction } = require('../services/paypal');


// ==========================================
// Rotas relacionadas aos petshops
// ==========================================

// Rota: Obter todos os petshops
router.get("/petshops", async (req, res) => {
  try {
    const petshops = await PetShop.find(); // Busca todos os petshops no banco
    res.json({ error: false, petshops }); // Retorna os petshops encontrados
  } catch (error) {
    res.json({ error: true, message: error.message }); // Retorna um erro em caso de falha
  }
});

// Rota: Obter detalhes de um petshop específico
router.get("/petshops/:id", async (req, res) => {
  try {
    console.log("ID recebido:", req.params.id); // Log do ID recebido para debug
    const petshop = await PetShop.findById(req.params.id); // Busca o petshop pelo ID

    if (!petshop) {
      // Retorna 404 caso o petshop não seja encontrado
      return res.status(404).json({
        error: true,
        message: "Petshop não encontrado",
      });
    }

    // Busca os produtos associados ao petshop
    const products = await Product.find({
      petshop_id: petshop._id,
    }).populate('petshop_id', 'recipient_id');

    // Retorna os detalhes do petshop e seus produtos
    res.json({
      error: false,
      petshop: {
        ...petshop._doc, // Retorna os dados do documento do petshop
        products, // Adiciona os produtos encontrados
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message, // Retorna erro em caso de falha
    });
  }
});

// ==========================================
// Rotas relacionadas a transações
// ==========================================

// Rota: Criar uma compra com divisão de pagamentos
router.post("/purchase", async (req, res) => {
  try {
    let payments;
    const petshopsMap = {};

    // Substitua pela URL completa da sua API
    const petshopsResponse = await axios.get("https://tcc-mundo-pet-api.vercel.app/petshops");
    const petshops = petshopsResponse.data.petshops;

    petshops.forEach((petshop) => {
      petshopsMap[petshop.recipient_id] = petshop.email;
    });

    // Resto do código permanece o mesmo
    if (Array.isArray(req.body)) {
      payments = req.body;

      if (!payments.length || !payments[0]?.recipientEmail || !payments[0]?.amount) {
        throw new Error("Payload inválido: Certifique-se de enviar um array de pagamentos com recipientEmail e amount.");
      }
    } else {
      const { items, split_rules } = req.body;

      if (!items || !split_rules) {
        throw new Error("Payload inválido: Certifique-se de enviar 'items' e 'split_rules'.");
      }

      payments = split_rules.map((rule) => {
        const amount = (parseFloat(items[0].unit_price) * (rule.percentage / 100)).toFixed(2);
        const recipientEmail = petshopsMap[rule.recipient_id] || rule.recipient_id;

        return {
          recipientEmail,
          recipientName: recipientEmail.includes("sb-qucx433316704@personal.example.com")
            ? "MundoPet Admin"
            : "Petshop Partner",
          amount: amount,
        };
      });
    }

    const transaction = await createSplitTransaction(payments);
    res.json(transaction);
  } catch (error) {
    console.error("Erro na rota de compra:", error);
    res.status(500).json({ error: true, message: error.message });
  }
});

// ==========================================
// Exemplo de payload esperado para a rota /purchase
// [
//   {
//     "recipientEmail": "sb-owwkz26611905@business.example.com",
//     "recipientName": "Petshop A",
//     "amount": "100.00"
//   },
//   {
//     "recipientEmail": "sb-5nw6n26611614@business.example.com",
//     "recipientName": "Petshop B",
//     "amount": "150.00"
//   }
// ]
// ==========================================

// Exporta o roteador para uso na aplicação principal
module.exports = router;
