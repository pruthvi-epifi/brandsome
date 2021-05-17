const { response } = require('express');
const express = require('express');
const router = express.Router();
const BrandTag = require('../models/BrandTag');
const Brand = require('../models/Brand');

// GET ONE
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
    
    // const brand = await BrandTag
    //               .findById(filteredData[0]._id)
    //               .populate('brand brand_category');
    // res.json(brand);

    const brand = await Brand
                  .findById(filteredData[0].brand)
                  .select('brand_name brand_domain brand_logo -_id');
    res.json({
      status: true,
      data: brand
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



  // try {
  //   const data = await BrandTag.find();

    // let finalResponse = request.map(q => {    
    
    //   let filteredData = data.filter(obj => {
    //     if(q.indexOf(obj.brand_tag.toLowerCase()) !== -1) {
    //       return obj;
    //     }
    //   });

    //   if(filteredData.length < 1) return {};
      
    //   let brand = await BrandTag
    //                 .findById(filteredData[0]._id)
    //                 .populate('brand brand_category');
    //   return brand;

    // });

    // res.json(finalResponse);
  //   res.json(data);

  // } catch (err) {
  //   res.json({ message: err });
  // }

});

module.exports = router;