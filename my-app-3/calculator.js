const express = require('express');
const app = express();


// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for the calculator form submission
app.get('/calculate', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  res.send(`The result of ${num1} + ${num2} is ${num1 + num2}`);
});

app.get('/add', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const result = num1 + num2;
  res.send(`The result of ${num1} + ${num2} is ${result}`);
});

app.get('/subtract', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const result = num1 - num2;
  res.send(`The result of ${num1} - ${num2} is ${result}`);
});

app.get('/multiply', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const result = num1 * num2;
  res.send(`The result of ${num1} * ${num2} is ${result}`);
});

app.get('/divide', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const result = num1 / num2;
  res.send(`The result of ${num1} / ${num2} is ${result}`);
});

app.listen(3001, () => {
  console.log('Listening on localhost:3000');
});

