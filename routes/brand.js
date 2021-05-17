const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const BrandTag = require('../models/BrandTag');

// GET ALL
router.get('/', async (req,res) => {

  try {
    const data = await Brand.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// GET ONE
router.get('/:id', async (req,res) => {

  try {
    const data = await Brand.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});


// ADD ONE
router.post('/', async (req,res) => {
  
  req.body.brand_name = req.body.brand_name.trim();

  // check existing
  const existing = await Brand.findOne({ brand_name: req.body.brand_name }).exec();
  if(existing) res.json({ message: 'Brand name exists' }); 

  const existing2 = await Brand.findOne({ brand_domain: req.body.brand_domain }).exec();
  if(existing2) res.json({ message: 'Brand domain exists' }); 

  const existing3 = await BrandTag.findOne({ brand_tag: req.body.brand_name }).exec();
  if(existing3) res.json({ message: 'Brand tag exists' }); 

  const obj = new Brand({
    brand_name: req.body.brand_name,
    brand_domain: req.body.brand_domain,
    brand_logo: 'https://logo.clearbit.com/' + req.body.brand_domain
  });  

  try {
    const data = await obj.save();

    const objTag = new BrandTag({
      brand_tag: req.body.brand_name,
      brand: data._id
    });  
    const dataTag = await objTag.save();

    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// UPDATE ONE
router.patch('/:id', async (req,res) => {
  
  try {
    const data = await Brand.updateOne(
      { _id: req.params.id }, 
      { $set: 
        {
          brand_name: req.body.brand_name,
          brand_domain: req.body.brand_domain,
          brand_logo: 'https://logo.clearbit.com/' + req.body.brand_domain
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
    const data = await Brand.remove({ _id: req.params.id });  
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;