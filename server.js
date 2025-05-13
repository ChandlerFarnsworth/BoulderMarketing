/**
 * Boulder Marketing Website
 * A simple Express server for static HTML files
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Form submission handling
app.post('/contact-submit', (req, res) => {
  console.log('Form submission:', req.body);
  // In a real application, you would process the form data here
  // (send email, save to database, etc.)
  res.redirect('/thank-you.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});