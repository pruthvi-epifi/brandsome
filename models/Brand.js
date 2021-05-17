const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
  brand_name: { type: String, required: true },
  brand_domain: { type: String, required: true },
  brand_logo: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Brand', BrandSchema);