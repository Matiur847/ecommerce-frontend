import React from "react";
import '../style/Review.css'
import profileImg from '../img/profile-user.png'
import ReactStars from 'react-rating-stars-component'

const Review = ({ review }) => {
  return (
    <div className="review-section">
      <p className="mt-3">Customer Review:</p>
      <div className="customer-review-details">
        <img src={profileImg} alt="" className="w-25 mt-2" />
        <p className="mt-2">Name: <span>{review.name}</span></p>
        <ReactStars edit={false} value={review.rating} />
        <span>{review.comment}</span>
      </div>
    </div>
  );
};

export default Review;
