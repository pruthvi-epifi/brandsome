const { response } = require('express');
const express = require('express');
const router = express.Router();
const BrandTag = require('../models/BrandTag');
const Brand = require('../models/Brand');



// GET ONE
/* Known issues:
** 1. PAYPAL *TWILIO 4029357733 US, showing paypal, shoudl be twilio
** 2. Google Adwords NAVI MUMABI IN is showing google, should be google ads
*/
router.get('/', async (req,res) => {

  const q = req.query.q.toLowerCase();
  
  try {
    const data = await BrandTag.find();
    
    const filteredData = data.filter(obj => {
      if(q.indexOf(obj.brand_tag.toLowerCase()) !== -1) {
        return obj;
      }
    });

    if(filteredData.length < 1) {
      res.json({
        status: false,
        message: 'Brand not found'
      });
    }
    
    let brand = await Brand
                  .findById(filteredData[0].brand)
                  .select('brand_name brand_domain brand_logo -_id');

    let brandTags = await BrandTag
                  .find({ brand: filteredData[0].brand })
                  .select('brand_tag');

    res.json({
      status: true,
      data: brand,
      tags: brandTags
    });

  } catch (err) {
    res.json({ message: err });
  }

});



// GET MULTIPLE
router.post('/multiple', async (req,res) => {

  req.body = req.body.map(obj => {
    obj.brand = {
      name: obj.merchant_name.toLowerCase().replace(/\s+/g, ' ').trim(),
      logo: '',
      category_name: obj.open_category_name,
      category_color: obj.open_category_color,
      category_logo: obj.open_category_logo
    };
    return obj;
  });

  // res.json(req.body);

  try {

    const data = await BrandTag.find();
    
    

  } catch(err) {
    res.json({ message: err });
  }

});



module.exports = router;