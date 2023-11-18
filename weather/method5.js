const got = require('got');

got('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b', { json: true }).then(response => {
//   console.log(response.body.url);
//   console.log(response.body.explanation);

console.log(response.body)
}).catch(error => {
    console.log(error.response)
//   console.log(error.response.body);
});