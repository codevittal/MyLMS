const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: false, unique: true, sparse: true },
  mobile: { type: String, required: false, unique: true, sparse: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['laborer', 'work_poster'], required: true },
  name: { type: String, required: true },
  workType: { type: String, required: function() { return this.role === 'laborer'; } },
  location: { type: String, required: true },
  
  // New fields for ratings
  laborerRatings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
