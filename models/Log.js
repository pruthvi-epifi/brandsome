const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  req: { type: String },
  res: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  status: { type: String, required: true }
},{
  timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);