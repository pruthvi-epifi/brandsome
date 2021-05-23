const express = require('express');
const router = express.Router();
const Log = require('../models/Log');



// GET ALL
router.get('/', async (req,res) => {

  try {
    const data = await Log.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});


module.exports = router;