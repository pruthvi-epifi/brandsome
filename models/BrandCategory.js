const mongoose = require('mongoose');

const BrandCategorySchema = mongoose.Schema({
  brand_category_name: { type: String, required: true },
  brand_category_logo: { type: String },
  brand_category_color: { type: String }  
}, {
  timestamps: true
});

module.exports = mongoose.model('BrandCategory', BrandCategorySchema);