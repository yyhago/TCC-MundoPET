const axios = require('axios');

const express = require("express");
const router = express.Router();

const PetShop = require("../models/petshop");
const Product = require("../models/product");
const { createSplitTransaction } = require('../services/paypal'); 

router.get("/petshops", async (req, res) => {
  try {
    const petshops = await PetShop.find();
    res.json({ error: false, petshops });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
});

router.get("/petshops/:id", async (req, res) => {
  try {
    console.log("ID recebido:", req.params.id);
    const petshop = await PetShop.findById(req.params.id);

    if (!petshop) {
      return res.status(404).json({
        error: true,
        message: "Petshop não encontrado",
      });
    }

    const products = await Product.find({
      petshop_id: petshop._id,
    }).populate('petshop_id', 'recipient_id');
    
    res.json({
      error: false,
      petshop: {
        ...petshop._doc,
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.post("/purchase", async (req, res) => {
  try {
    let payments;
    const petshopsMap = {};

    // Busque os petshops e crie um mapeamento de recipient_id para email
    const petshopsResponse = await axios.get("http://localhost:8000/petshops");
    const petshops = petshopsResponse.data.petshops;

    petshops.forEach((petshop) => {
      petshopsMap[petshop.recipient_id] = petshop.email;
    });

    // Verificar o formato do payload
    if (Array.isArray(req.body)) {
      // Payload direto no formato de pagamentos
      payments = req.body;

      // Validação básica
      if (!payments.length || !payments[0]?.recipientEmail || !payments[0]?.amount) {
        throw new Error("Payload inválido: Certifique-se de enviar um array de pagamentos com recipientEmail e amount.");
      }
    } else {
      // Payload no formato { items, split_rules }
      const { items, split_rules } = req.body;

      if (!items || !split_rules) {
        throw new Error("Payload inválido: Certifique-se de enviar 'items' e 'split_rules'.");
      }

      // Criar os pagamentos
      payments = split_rules.map((rule) => {
        const amount = (parseFloat(items[0].unit_price) * (rule.percentage / 100)).toFixed(2);

        // Obter o email correspondente ao recipient_id
        const recipientEmail = petshopsMap[rule.recipient_id] || rule.recipient_id;

        return {
          recipientEmail, // Email do petshop ou taxa administrativa
          recipientName: recipientEmail.includes("example.com")
            ? "MundoPet Admin"
            : "Petshop Partner",
          amount: amount,
        };
      });
    }

    // Enviar os pagamentos para o PayPal
    const transaction = await createSplitTransaction(payments);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});



/***
 * 
 * [
  {
    "recipientEmail": "sb-owwkz26611905@business.example.com",
    "recipientName": "Petshop A",
    "amount": "100.00"
  },
  {
    "recipientEmail": "sb-5nw6n26611614@business.example.com",
    "recipientName": "Petshop B",
    "amount": "150.00"
  }
]

 */



module.exports = router;
