const request = require('request');
const key = '491bbf9617cb2bc3c72a5c2c1894b1ee';

const data = (city, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (res.body.cod !== 200) {
      callback('Unable to find location', undefined);
    } else {
      const body = res.body.main;
      body.desc = res.body.weather[0].main;
      callback(undefined, body);
    }
  });
};

module.exports = data;
