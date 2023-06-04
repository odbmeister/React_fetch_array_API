const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

// Create an Express server
const app = express();

// Serve the built React files
app.use(express.static(path.join(__dirname, 'react-fetch-api-app/build')));

// Configure API endpoints
app.get('/data', (req, res) => {
  // Handle API request logic here
  // Example: Return mock data
  const reviews = require('./data.json');
  const filteredReviews = reviews.toplists['575'];
  
  res.json(filteredReviews);
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-fetch-api-app/build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Build the React app
const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: path.join(__dirname, 'react-fetch-api-app'),
  shell: true,
  stdio: 'inherit',
});

buildProcess.on('exit', (code) => {
  if (code === 0) {
    console.log('React build process complete');
  } else {
    console.error('React build process failed');
  }
});
