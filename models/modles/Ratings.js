const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workId: { type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true },
  paymentRating: { type: Number, min: 1, max: 5 },
  efficiencyRating: { type: Number, min: 1, max: 5 },
  punctualityRating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rating', ratingSchema);
