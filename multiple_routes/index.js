const express=require("express")
const bodyParser=require('body-parser')
//const notifier = require('node-notifier');
const fs=require('fs')
let alert = require('alert'); 


//var popup = require('popups');
// Importing all the routes
const homeroute=require("./routes/home.js")
const loginroute=require("./routes/login.js")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Creating express server
const app=express()
// app.get("/login",(req,res,next)=>{
//     res.sendFile( __dirname + "/" + "login.html" );
// })
app.post("/submit",urlencodedParser,function(req,res){
    var User=req.body.user
    var Pass=req.body.pass
    // if((User=="rvs") &&(Pass=="rvs")){
    //     res.send("user name and password is correct")
    // }else{
    //    alert("user name and password is incorrect")
    // }
    fs.readFile(__dirname+ '/user.json','utf-8',(error,data)=>{
        let userdata=JSON.parse(data.toString())
        let filteruser=userdata.users.filter(filedata=>filedata.name==User && filedata.password==Pass)
        if(filteruser.length>0)
        res.send("user name and password is correct")
        else
        alert("user name and password is incorrect")
    })
    
})
// Handling routes request
app.use("/home",homeroute)
app.use("/login",loginroute)
app.listen((3000),()=>{
    console.log("Server is Running")
})
