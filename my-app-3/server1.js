var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors =require("cors");
const { response } = require('express');
app.use(cors())
app.use(bodyParser.json())
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index1.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index1.html" );
})

app.post('/process_post', function (req, res) {
   // Prepare output in JSON format
   var weight = parseFloat(req.body.weight);
   var height = parseFloat(req.body.height);
   var bmi = weight / (height * height);
  console.log(bmi);
   
  
let desc='';
  if (bmi < 0.0019) {
  desc= (`hey! your BMI is around: ${bmi}
   You are Under weight!`);
} else if (0.0019 <= bmi && bmi < 0.0025) {
  desc=(`hey! your BMI is around: ${bmi}
   You are correct weight!`);
} else if (0.0025 <= bmi && bmi < 0.0030) {
 desc= (`hey! your BMI is around: ${bmi}
   You are high weight!`);
} else {
  desc= ("<h3>hey! " +
            " your BMI is around: " + bmi +
            "<centre><h1>You are Obese!");
}
    res.end(JSON.stringify(desc));
})
var server = app.listen(8083, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
