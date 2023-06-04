import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [initialReviewCount, setInitialReviewCount] = useState(3);

  const loadMore = () => {
    setInitialReviewCount(initialReviewCount + 3);
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  useEffect(() => {
    setFilteredData(reviews.slice(0, initialReviewCount));
  }, [reviews, initialReviewCount]);

  // fetching the data from the server/API and sorting it by the correct order
  const fetchReviewsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        if (a.brand_id < b.brand_id) return -1;
        if (a.brand_id > b.brand_id) return 1;
        return 0;
      });
      setReviews(sortedData);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  return (
    <div className="App">
      <h1>Reviews</h1>
      <div className="reviews-container">
        {filteredData.map((review) => (
          <div className="review" key={review.brand_id}>
            <div className="logo-rating-container">
              <img className="logo" src={review.logo} alt="Logo" />
              <div className="rating">
                {Array.from({ length: review.info.rating }, (_, index) => (
                  <span key={index} className="star"></span>
                ))}
              </div>
            </div>
            <ul className="features">
              {review.info.features.map((feature, index) => (
                <li key={index}>
                  <span className="checkmark"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: review.terms_and_conditions }}></p>
            <a className="play-now" href={review.play_url}>PLAY NOW</a>
          </div>
        ))}
      </div>
      {reviews.length === 0 && <p>No reviews found.</p>}
      {reviews.length > 0 && (
        <button className="load-more" onClick={loadMore} disabled={initialReviewCount >= reviews.length}>
          Load More
        </button>
      )}
      {initialReviewCount >= reviews.length && <p className="message">All brands have been loaded.</p>}
    </div>
  );
}

export default App;