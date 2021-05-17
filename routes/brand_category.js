const express = require('express');
const router = express.Router();
const BrandCategory = require('../models/BrandCategory');

// GET ALL
router.get('/', async (req,res) => {

  try {
    const data = await BrandCategory.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// GET ONE
router.get('/:id', async (req,res) => {

  try {
    const data = await BrandCategory.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});


// ADD ONE
router.post('/', async (req,res) => {
  
  const obj = new BrandCategory({
    brand_category_name: req.body.brand_category_name,
    brand_category_logo: req.body.brand_category_logo,
    brand_category_color: req.body.brand_category_color
  });  

  try {
    const data = await obj.save();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// UPDATE ONE
router.patch('/:id', async (req,res) => {
  
  try {
    const data = await BrandCategory.updateOne(
      { _id: req.params.id }, 
      { $set: 
        {
          brand_category_name: req.body.brand_category_name,
          brand_category_logo: req.body.brand_category_logo,
          brand_category_color: req.body.brand_category_color
        } 
      }
    );
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});


// DELETE ONE
router.delete('/:id', async (req,res) => {
  
  try {
    const data = await BrandCategory.remove({ _id: req.params.id });  
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;