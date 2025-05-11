/**
 * Boulder Marketing Website
 * A simple Express server with Handlebars templating
 */

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: function(a, b) { return a === b; },
    getCurrentYear: function() { return new Date().getFullYear(); }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  console.log('Rendering home page');
  res.render('home', {
    title: 'Boulder Marketing - Marketing Built on the Rock',
    pageClass: 'home-page'
  });
});

app.get('/about', (req, res) => {
  console.log('Rendering about page');
  res.render('about', {
    title: 'About - Boulder Marketing',
    pageClass: 'about-page'
  });
});

app.get('/services', (req, res) => {
  console.log('Rendering services page');
  res.render('services', {
    title: 'Services - Boulder Marketing',
    pageClass: 'services-page'
  });
});

app.get('/portfolio', (req, res) => {
  console.log('Rendering portfolio page');
  res.render('portfolio', {
    title: 'Portfolio - Boulder Marketing',
    pageClass: 'portfolio-page'
  });
});

app.get('/contact', (req, res) => {
  console.log('Rendering contact page');
  res.render('contact', {
    title: 'Contact - Boulder Marketing',
    pageClass: 'contact-page'
  });
});

// Form submission handling
app.post('/contact-submit', (req, res) => {
  console.log('Form submission:', req.body);
  // In a real application, you would process the form data here
  // (send email, save to database, etc.)
  res.redirect('/thank-you');
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you', {
    title: 'Thank You - Boulder Marketing',
    pageClass: 'thank-you-page'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});