const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/paymentManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registernumber: String,
  course: String,
  batch: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/student", function (req, res) {
  res.render("student");
});

app.get("/hod", function (req, res) {
  res.render("cashierdetails");
});

app.get("/studentlogin", function (req, res) {
  res.render("studentlogin");
});

app.get("/studentregister", function (req, res) {
  res.render("studentregister");
});

app.post("/studentregister", function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    const newUser = new User({
      email: req.body.email,
      password: hash,
      registernumber: req.body.registernumber,
      name: req.body.name,
      course: req.body.course,
      batch: req.body.batch,
    });
    newUser
      .save()
      .then(() => {
        res.render("studentdetails", { user: newUser });
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

app.post("/studentlogin", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(function (foundUser) {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            res.render("studentdetails");
          } else {
            res.send("Invalid Password");
          }
        });
      } else {
        res.send("User not found");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/studentdetails", function (req, res) {
  res.render("studentdetails");
});
app.get("/studentprofile", function (req, res) {
  res.render("studentprofile");
});


app.get("/addpayment", function (req, res) {
  res.render("addpayment");
});

const fineSchema = new mongoose.Schema({
  name: String,
  register_number: String,
  amount: Number,
  fine_type: String,
  date: Date,
  batch:Number,
  section:String,
  fundName:String
});

const Fine = mongoose.model("Fine", fineSchema);

app.post("/addpayment", (req, res) => {
  const newFine = new Fine({
    name: req.body.name,
    register_number: req.body.register_number,
    amount: req.body.amount,
    fine_type: req.body.fine_type,
    date: req.body.date,
    section: req.body.section,
    batch:req.body.batch,
    fundName:req.body.fund_name,
  });

  newFine
    .save()
    .then(() => {
      res.send('fine successfully added');
    })
    .catch((error) => {
      res.status(500).send("Error adding fine");
    });
});

app.get("/viewprofile", (req, res) => {
  const userId = req.query.userId;

  User.findById(userId)
    .then((foundUser) => {
      if (foundUser) {
        res.render("viewprofile", { user: foundUser });
      } else {
        res.status(404).send("User not found.");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving user profile");
    });
});

app.get("/createfaculty", (req, res) => {
  res.render("createfaculty");
});

const facultySchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  course: String,
  batch: String,
});

const Faculty = mongoose.model("Faculty", facultySchema);

app.post("/createfaculty", (req, res) => {
  const newFaculty = new Faculty({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    course: req.body.course,
    batch: req.body.batch,
  });

  newFaculty
    .save()
    .then(() => {
      res.send("Faculty created successfully");
    })
    .catch((error) => {
      res.status(500).send("Error creating faculty");
    });
});

app.get("/filter", function (req, res) {
    const student = req.query.student;
    const batch = req.query.batch;
    const section = req.query.section;
    const fundType = req.query.fundType;
    const fundName = req.query.fundName;
  
    const filterParams = {};
  
    if (student) {
      filterParams.name = student;
    }
  
    if (batch) {
      filterParams.batch = batch;
    }
  
    if (section) {
      filterParams.section = section;
    }
  
    if (fundType) {
      filterParams.fine_type = fundType;
    }
  
    if (fundName) {
      filterParams.fund_name = fundName;
    }
  
    Fine.find(filterParams)
      .then(function (filteredFines) {
        if (filteredFines.length === 0) {
          res.send("No fines found matching the selected criteria.");
        } else {
          res.render("filteredFines", { fines: filteredFines });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("Error retrieving filtered fines");
      });
  });
    
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
