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
    });

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
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: true, message: "O corpo da requisição deve ser um array de pagamentos." });
    }

    const transaction = await createSplitTransaction(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});
module.exports = router;
