const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const User = require('../models/User');

// Middleware to protect routes if needed (e.g., check for a valid JWT token)
const auth = require('../middleware/auth'); 

router.post('/submit', async (req, res) => {
  const { ratedTo, workId, paymentRating, efficiencyRating, punctualityRating, comment } = req.body;
  const ratedBy = req.user.id; // Get the user ID from the authenticated request
  
  try {
    const newRating = new Rating({
      ratedBy,
      ratedTo,
      workId,
      paymentRating,
      efficiencyRating,
      punctualityRating,
      comment,
    });

    await newRating.save();

    // Update the average rating for the rated user (laborer)
    const laborer = await User.findById(ratedTo);
    const allRatings = await Rating.find({ ratedTo });
    
    // Calculate new average
    const totalRatingSum = allRatings.reduce((sum, r) => sum + r.efficiencyRating + r.punctualityRating, 0);
    const newAverageRating = totalRatingSum / (allRatings.length * 2); // 2 is for efficiency and punctuality
    
    laborer.averageRating = newAverageRating;
    laborer.ratingsCount = allRatings.length;
    await laborer.save();

    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
