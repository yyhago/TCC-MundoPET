const express = require('express');
const router = express.Router();

router.get('/', async ( req,res ) => {
  try {
    res.json({ error: false, message: 'Hello Pets' })
  } catch (error) {
    res.json({ error: true, message: error.message })
  }
})

module.exports = router;