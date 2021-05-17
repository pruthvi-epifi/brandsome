const express = require('express');
const router = express.Router();
const BrandTag = require('../models/BrandTag');

// GET ALL
router.get('/', async (req,res) => {

  try {
    const data = await BrandTag
                  .find()
                  .populate('brand brand_category');
                  // .select('brand.brand_name');
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

// GET ONE
router.get('/:id', async (req,res) => {

  try {
    const data = await BrandTag
                  .findById(req.params.id)
                  .populate('brand brand_category');
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});


// ADD ONE
router.post('/', async (req,res) => {

  req.body.brand_tag = req.body.brand_tag.trim();

  // check existing
  const existing = await BrandTag.findOne({ brand_tag: req.body.brand_tag }).exec();
  if(existing) res.json({ message: 'Tag exists' }); 
  
  const obj = new BrandTag({
    brand_tag: req.body.brand_tag,
    brand: req.body.brand,
    brand_category: req.body.brand_category
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
    const data = await BrandTag.updateOne(
      { _id: req.params.id }, 
      { $set: 
        {
          brand_tag: req.body.brand_tag,
          brand: req.body.brand,
          brand_category: req.body.brand_category
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
    const data = await BrandTag.remove({ _id: req.params.id });  
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }

});

module.exports = router;