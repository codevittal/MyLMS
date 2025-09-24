// src/components/RatingForm.js
import React, { useState } from 'react';
import StarRating from './StarRating';

const RatingForm = ({ laborerId, workId, onRatingSubmit }) => {
  const [paymentRating, setPaymentRating] = useState(0);
  const [efficiencyRating, setEfficiencyRating] = useState(0);
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ratingData = {
      ratedTo: laborerId,
      workId,
      paymentRating,
      efficiencyRating,
      punctualityRating,
      comment,
    };
    
    try {
      const response = await fetch('/api/ratings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData),
      });
      const data = await response.json();
      onRatingSubmit(data); // Call a function to handle the result
    } catch (error) {
      console.error('Failed to submit rating', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="mb-4 text-xl font-bold">Rate this Laborer</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment</label>
          <StarRating rating={paymentRating} setRating={setPaymentRating} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Efficiency</label>
          <StarRating rating={efficiencyRating} setRating={setEfficiencyRating} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time Punctuality</label>
          <StarRating rating={punctualityRating} setRating={setPunctualityRating} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="3" className="w-full p-2 mt-1 border rounded" />
        </div>
        <button type="submit" className="w-full p-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">Submit Rating</button>
      </form>
    </div>
  );
};

export default RatingForm;
