// src/components/StarRating.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating, readOnly = false }) => {
  const [hover, setHover] = useState(null);
  
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !readOnly && setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={20}
              onMouseEnter={() => !readOnly && setHover(ratingValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
