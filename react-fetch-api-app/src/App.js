import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [reviews, setReviews] = useState([]); // Holds all the reviews fetched from the server
  const [filteredData, setFilteredData] = useState([]); // Holds the filtered reviews to be displayed
  const [initialReviewCount, setInitialReviewCount] = useState(3); // Determines the number of reviews to display initially

  // Load more reviews when the "Load More" button is clicked
  const loadMore = () => {
    setInitialReviewCount(initialReviewCount + 3);
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  useEffect(() => {
    // Update the filteredData whenever the reviews or initialReviewCount changes
    setFilteredData(reviews.slice(0, initialReviewCount));
  }, [reviews, initialReviewCount]);

  // Fetching the data from the server/API and sorting it by the correct order
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
        {/* Render each filtered review */}
        {filteredData.map((review) => (
          <div className="review" key={review.brand_id}>
            <div className="logo-rating-container">
              <img className="logo" src={review.logo} alt="Logo" />
              <div className="rating">
                {/* Render star icons based on the rating */}
                {Array.from({ length: review.info.rating }, (_, index) => (
                  <span key={index} className="star">&#9733;</span>
                ))}
              </div>
            </div>
            <ul className="features">
              {/* Render each feature of the review */}
              {review.info.features.map((feature, index) => (
                <li key={index}>
                  <span className="checkmark">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: review.terms_and_conditions }}></p>
            <a className="play-now" href={review.play_url}>PLAY NOW</a>
          </div>
        ))}
      </div>
      {/* Display a message if no reviews are found */}
      {reviews.length === 0 && <p>No reviews found.</p>}
      {/* Render the "Load More" button if there are more reviews to load */}
      {reviews.length > 0 && (
        <button className="load-more" onClick={loadMore} disabled={initialReviewCount >= reviews.length}>
          Load More
        </button>
      )}
      {/* Display a message when all brands have been loaded */}
      {initialReviewCount >= reviews.length && <p className="message">All brands have been loaded.</p>}
    </div>
  );
}

export default App;