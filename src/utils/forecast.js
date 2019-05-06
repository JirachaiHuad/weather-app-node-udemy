const request = require('request')

function forecast (latitude, longtitude, callback) {
  const url = `https://api.darksky.net/forecast/0155c1eda138cba99e3ee3a6091e35d3/${latitude},${longtitude}?units=si`

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the weather service')
    }
    else if (body.error) {
      callback('Unable to find location')
    }
    else {
      const { temperature, precipProbability } = body.currently
      const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]

      const forecast = `${summary}. It's currently ${temperature}. High at ${temperatureHigh} and low at ${temperatureLow}. There's a ${precipProbability * 100}% chance of rain!`
  
      callback(undefined, forecast)
    }
  })
}

module.exports = forecast
