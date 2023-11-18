const request = require('request');
const url="http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b"
request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
console.log(body)


});
