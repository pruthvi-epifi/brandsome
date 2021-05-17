const mongoose = require('mongoose');

const BrandTagSchema = mongoose.Schema({
  brand_tag: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  brand_category: { type: mongoose.Schema.Types.ObjectId, ref: 'BrandCategory' }  
},{
  timestamps: true
});

module.exports = mongoose.model('BrandTag', BrandTagSchema);