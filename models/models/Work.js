const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  workType: { type: String, required: true },
  location: { type: String, required: true },
  laborRequired: { type: Number, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' },
});

module.exports = mongoose.model('Work', workSchema);
