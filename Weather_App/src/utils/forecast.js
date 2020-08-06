const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ="http://api.weatherstack.com/current?access_key=9f8d10d70e1d992f2ea4745ec0b47efd&query="+latitude+","+longitude;

    request({ url, json: true }, (error, {body}) => {


        console.log(body)

        callback(undefined, body)
    })
}

module.exports = forecast