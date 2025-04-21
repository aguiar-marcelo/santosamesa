
"use client";
import React from 'react';

const SectionFilterRatingUser: React.FC<RatingFilterProps> = ({ selectedRatings, onRatingClick }) => {
  return (
    <div className="rating-filter-buttons">
      {[5, 4, 3, 2, 1].map((rating) => (
        <button
          key={rating}
          className={`rating-filter-button ${selectedRatings.includes(rating) ? 'selected' : ''}`}
          onClick={() => onRatingClick(rating)}
        >
          {rating}
          <img
            className="filled-star-icon"
            src="img/estrela-preenchida.png"
            alt="Estrela"
          />
        </button>
      ))}
    </div>
  );
};


export default SectionFilterRatingUser;