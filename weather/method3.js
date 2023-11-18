const axios = require('axios');

axios.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b')
  .then(response => {
    // console.log(response.data.url);
    // console.log(response.data.explanation);
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });