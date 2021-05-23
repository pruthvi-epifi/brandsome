const { response } = require('express');
const express = require('express');
const router = express.Router();
const BrandTag = require('../models/BrandTag');
const Brand = require('../models/Brand');
const Log = require('../models/Log');
require('dotenv/config');

// COUNT No. of Brands & Tags in system currently

router.get('/count', async (req,res) => {

  try {
    const countTags = await BrandTag.count();
    const countBrands = await Brand.count();
    res.json({
      status: true,
      data: {
        tags: countTags,
        brands: countBrands
      }
    });
  } catch(err) {
    res.json({ message: err });
  }

});


router.get('/', async (req,res) => {

  const q = req.query.q.toLowerCase();
  
  try {
    const data = await BrandTag.find();
    
    // ToDo: search algo improvement required
    const filteredData = data.filter(obj => {
      if(q.indexOf(obj.brand_tag.toLowerCase()) !== -1) {
        return obj;
      }
    });

    if(filteredData.length < 1) {
      
      if(process.env.LOG == "true") {
        const log = new Log({
          req: q,
          status: 'miss'
        });
        log.save();
      }

      res.json({
        status: false,
        message: 'Brand not found'
      });
    }
    
    let response = {};
    
    response.status = true;
    
    response.data = await Brand
                  .findById(filteredData[0].brand)
                  .select('brand_name brand_domain brand_logo -_id'); // TODO -_id

    if(process.env.LOG == "true") {
      const log = new Log({
        req: q,
        res: filteredData[0].brand,
        status: 'hit'
      });
      log.save();
    }

    if(req.query.tags == 1) {            
      const tags = await BrandTag
                    .find({ brand: filteredData[0].brand })
                    .select('brand_tag');
      const tagsData = tags.map(obj => {
        return obj.brand_tag;
      });
      response.tags = tagsData;
    }

    res.json(response);

  } catch (err) {
    res.json({ message: err });
  }

});



// GET MULTIPLE
// router.post('/multiple', async (req,res) => {

//   req.body = req.body.map(obj => {
//     obj.brand = {
//       name: obj.merchant_name.toLowerCase().replace(/\s+/g, ' ').trim(),
//       logo: '',
//       category_name: obj.open_category_name,
//       category_color: obj.open_category_color,
//       category_logo: obj.open_category_logo
//     };
//     return obj;
//   });

//   // res.json(req.body);

//   try {

//     const data = await BrandTag.find();
    
    

//   } catch(err) {
//     res.json({ message: err });
//   }

// });



module.exports = router;