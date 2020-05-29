const express = require('express');
const hbs = require('hbs');
const path = require('path');
const locationData = require('./location-data');
const app = express();

// console.log(__filename);
const basePath = path.dirname(__dirname);

app.use(express.static(`${basePath}/public`));

const templatePath = `${basePath}/templates/views`;
const hbsPath = `${basePath}/templates/partials`;
hbs.registerPartials(hbsPath);
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Saurabh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Saurabh Singh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is some helpful text',
    name: 'Saurabh',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'Location must be provided',
    });
  }
  locationData(req.query.location, (err, data) => {
    if (err) {
      res.send({
        error: err,
      });
    } else {
      res.send({
        body: data,
      });
    }
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Saurabh',
    errorMessage: 'Page Not Found',
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('Server is Running');
});
