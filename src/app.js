const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

//Define configs for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and specific location
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'James',
  })
})

app.get('', (request, response) => {
  response.send('<h1>HOHOHO MOTHERFUCKER</h1>')
  // response.send(path.join(__dirname, '../public/index.html'))
})

app.get('/smth', (req, res) => {
  res.send({
    suckWeather: 15,
    dullWeather: 20,
    niceSmell: 'hair',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Weather App',
    name: 'James',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'James',
    message: 'Some help message',
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide location!'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      })
    }

    forecast(({ latitude, longitude, callback: (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          })
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        })
      } }))
  })
})

app.get('/products', (req, res) => {
  const products = ['mono', 'cono']
  if (req.query.search) {
    return res.send({
      product: products.filter((i) => {
        if (i === req.query.search) {
          return i;
        }
      })
    })
  }
  res.send({
    products: ['mono','cono'],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Article Not Found',
    name: 'James',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page Not Found',
    name: 'James',
    title: '404'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

