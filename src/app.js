const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Huad'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Huad'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'WOW! very helpful !!!',
    title: 'Help',
    name: 'Huad'
  })
})

app.get('/weather',  (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longtitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'provide search term'
    })
  }
  
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('not_found', {
    title: '404 - NOT FOUND',
    errorMessage: 'Help article not found.',
    name: 'Huad'
  })
})

app.get('*', (req, res) => {
  res.render('not_found', {
    title: '404 - NOT FOUND',
    errorMessage: 'Page not found.',
    name: 'Huad'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000 !')
})
