const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    const url = `http://api.weatherstack.com/current?access_key=2a60fdb3f0f75b1f8529aeae8bd43765&query=${latitude},${longitude}&units=m`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. There is ' + body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast