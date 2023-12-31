//jshint esversion:6
 require('dotenv').config();
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs");
const mongoose=require("mongoose");
const md5=require('md5');
const session=require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
// var encrypt = require('mongoose-encryption');
//console.log(md5("gokul"))
// const bycrypt=require("bcrypt");
// const saltrounds=10;
const app=express();
console.log(process.env.API_KEY);
console.log("week password hash:"+md5("12345"));
console.log("strong password hash:"+md5("gdfjhgdfjhbdm"))

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret:"our little secret.",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
//mongoose.set("useCreateIndex",true);

const userSchema=new mongoose.Schema({
    email:String,
    password:String
});
// const secret="this is our little our secrets.";
// userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]});
userSchema.plugin(passportLocalMongoose)
const User=new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("home")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/register",function(req,res){
    res.render("register")
});

app.get("/secrets",function(req,res){
 
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
            res.redirect("/login")
    }
})
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.post("/register", function(req, res){
   User.register({username:req.body.username},req.body.password,function(err,user){
    if(err){
        console.log(err);
        res.redirect("/register");

    }else{
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secrets")
        })
    }
   })

});
app.post("/login",function(req,res){
   const user=new User({
    username:req.body.username,
    passsword:req.body.passsword
   });
   req.login(user,function(err){
    if(err){
        console.log(err)
    }else{
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secrets")
        })
    }
   })
})

app.listen(3000,function(req,res){
    console.log("server started on port 3000")
})