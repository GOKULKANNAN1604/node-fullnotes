var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var cors =require("cors");
app.use(cors())
app.use(bodyParser.json())
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index1.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index1.html" );
})
// app.get('/cal', function (req, res) {
//    var weight=parseInt(req.body.fi)
//    var height=parseInt(req.body.se)
//    var total=weight+height
//    console.log(total);
//    res.sendFile( __dirname + "/" + "cal" );
// })
app.post('/clicked', (req, res) => {
   const click = {clickTime: new Date()};
   console.log(click);
   var weight=document.getElementById("fi")
   var height=document.getElementById("se")
   // var height=parseInt(req.body.se)
   var total=weight+height
   console.log(total);
})

app.post('/cal', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   var weight=parseInt(req.body.weight)
   var height=parseInt(req.body.height)
   // var total=weight+height
   // console.log(total);
   // res.send(total)
   // res.render('/public/cal.html', { Total:total});

       var cal=(weight) / ((height * height)/ 10000)
      //  res.send(cal+"is a naaoa")
       console.log(cal);
       if(cal < 18.6){
         res.send(cal+` is under weight`)
       }
       else if(cal >= 18.6 && cal < 24.9){
         res.send(cal +` is normal weight`)
       }
       else{
         res.send(cal +` is over weight`)
       }
       })
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    ''
    console.log("Example app listening at http://%s:%s", host, port)
 })
