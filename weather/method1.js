const https = require('https');
const url="https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b"
https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   // console.log(JSON.parse(data).explanation);
  console.log(data)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
