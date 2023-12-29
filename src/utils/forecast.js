const request = require("postman-request")

const forecast = ({ latitude, longitude, callback }) => {
  const url = `http://api.weatherstack.com/current?access_key=386f06c8aca10f7205d19ea7b941b588&query=${latitude}, ${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (response.body.error) {
      callback('Unable to find location. Try another one.')
    } else {
      const weatherDescription = response.body.current.weather_descriptions[0];
      const { localtime } = response.body.location;
      const { temperature, feelslike: feelsLike, wind_speed } = response.body.current;
      return callback(undefined,`${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. The date and local time is is ${localtime}.`)
    }
  })

}
module.exports = forecast;
