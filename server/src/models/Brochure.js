const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    required: true,
    trim: true
  },
  brochure: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
brochureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Brochure', brochureSchema); 