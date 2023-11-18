const bodyparser = require('body-parser')
const express = require("express")
const path = require('path')
const app = express()

var PORT = process.env.port || 5000

// View Engine Setup
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/", function(req, res){
	res.render('addform')
});

app.post('/saveData', (req, res) => {
	//console.log("the first number is:",parseInt(req.body.firstnumber))

 var total=("The total is:", parseInt(req.body.firstnumber)+parseInt(req.body.secondnumber))
 res.render('addform.ejs',{result:total})
});

app.listen(PORT, function(error){
	if (error) throw error
	console.log("Server created Successfully on PORT", PORT)
})