import React from "react";
import "./StarRatingComp.css";

const StarRatingComp = ({ index, rating, onStarClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          className="starcontainer"
          key={star}
          onClick={() => onStarClick(index, star)}
          style={{
            color: star <= rating ? "gold" : "#B6BBC4",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRatingComp;
