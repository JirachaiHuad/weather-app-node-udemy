const request = require('request')

function geocode (address, callback) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamlyYWNoYWkxMjM0IiwiYSI6ImNqdjUzY25qMzJ4MWs0Y2p3ZG1heXppMjMifQ.O3FcAzeZP-Q5x81uatMZ_w&limit=1'

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the weather service')
    }
    else if (body.features.length === 0) {
      callback('Unable to find location')
    }
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
