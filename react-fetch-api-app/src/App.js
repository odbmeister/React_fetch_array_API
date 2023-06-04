import React, { useEffect, useState } from 'react';

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const fetchReviewsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  return (
    <div className="App">
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.brand_id}>
          <h2>{review.brand_id}</h2>
          <p>Rating: {review.info.rating}</p>
          <ul>
            {review.info.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p>Terms and Conditions: {review.terms_and_conditions}</p>
          <img src={review.logo} />
          <a href={review.play_url}>PLAY NOW</a>
        </div>
      ))}
    </div>
  );
}

export default App;