const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the home page
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/calculator.html');
});

// Route for the calculator form submission
app.post('/result', (req, res) => {
  const num1 = parseInt(req.body.first_num);
  const num2 = parseInt(req.body.second_num);
  const operator = req.body.operator;
  let result;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      res.send('Invalid operator');
      return;
  }
  res.write(`The result of ${num1} ${operator} ${num2} is ${result}`);
  res.end();
});

app.get('/add/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const result = num1 + num2;
  res.send(`The result of ${num1} + ${num2} is ${result}`);
});


app.get('/subtract/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const result = num1 - num2;
  res.send(`The result of ${num1} - ${num2} is ${result}`);
});


app.get('/multiply/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const result = num1 * num2;
  res.send(`The result of ${num1} * ${num2} is ${result}`);
});


app.get('/divide/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const result = num1 / num2;
  res.send(`The result of ${num1} / ${num2} is ${result}`);
});

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});
