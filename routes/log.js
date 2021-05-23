const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

/*

// GET ALL
router.get('/', async (req,res) => {

  try {
    const data = await Log.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// GET HITS
router.get('/hits', async (req,res) => {

  try {
    const data = await Log.find({ status: 'hit' })
                          .populate('res')
                          .select('req res -_id');
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// GET MISSES
router.get('/misses', async (req,res) => {

  try {
    const data = await Log.find({ status: 'miss' }).select('req -_id');
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

*/

module.exports = router;