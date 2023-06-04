import React, { useEffect, useState } from 'react';

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
      {filteredData.map((review) => (
        <div key={review.brand_id}>
          <img src={review.logo} alt="Logo" />
          <h2>{review.brand_id}</h2>
          <p>Rating: {review.info.rating}</p>
          <ul>
            {review.info.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p dangerouslySetInnerHTML={{ __html: review.terms_and_conditions }}></p>
          <a href={review.play_url}>PLAY NOW</a>
        </div>
      ))}
      {reviews.length === 0 && <p>No reviews found.</p>}
      {reviews.length > 0 && (
        <button onClick={loadMore} disabled={initialReviewCount >= reviews.length}>
        Load More
      </button>
      )}  
    </div>
  );
}

export default App;