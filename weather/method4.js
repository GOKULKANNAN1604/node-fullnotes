const superagent = require('superagent');

superagent.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca19c92eea96cec0d24cab6afb5cc72b')
.query({ api_key: 'DEMO_KEY', date: '2017-08-02' })
.end((err, res) => {
  if (err) { return console.log(err); }
//   console.log(res.body.url);
//   console.log(res.body.explanation);

console.log(res.body)
});
