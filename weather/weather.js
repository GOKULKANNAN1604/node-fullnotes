const express=require("express")
const bodyParser = require('body-parser');
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+ "/weather.html")
})
app.post("/",function(req,res){
    const query = req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=ca19c92eea96cec0d24cab6afb5cc72b&units=imperial";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
    
    const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(weatherDescription);
    res.write("<p>The weather is currently "+weatherDescription+".<p>")
    res.write("<h1>The Temperature in "+query+" is "+temp+" degrees Celcius.<h1>")
    res.write("<img src="+imageURL+">");
    res.send()
        })
    })
    // res.send("Server is up and running.")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})
