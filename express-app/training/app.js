import express from 'express';
const app = express();
const accounts = [
  { id: 1, name: "John Doe", balance: 100 },
  { id: 2, name: "Jane Doe", balance: 500 },
  { id: 3, name: "Mike Doe", balance: 200 }
]

app.get("/accounts", (req, res) => {
  res.json(accounts);
})

app.get("/accounts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const account = accounts.find(acc => acc.id === id);

  if(account) {
    res.json(account);
  } else {
    res.send("<h1>Account not found</h1>");
  }
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//1
app.get('user/:username', (req, res) => {
    const { username } = req.params;
});

res.json({
    username: username,
    message: 'Welcome ${username}!'
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//2
const express = require('express');
const port = 3000;

const products = [
  { productId: 101, productName: 'Laptop', price: 1200 },
  { productId: 102, productName: 'Smartphone', price: 800 },
  { productId: 103, productName: 'Headphones', price: 150 }
];

app.get('/product/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find(p => p.productId == productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: 'Product not found'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


//3

app.get('/greet/:name/:age', (req, res) => {
    const { name, age } = req.params;
    res.json({
        message: `Hello ${name}, you are ${age} years old!`
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//4
app.get('/math/:operation/:num1/:num2', (req, res) => {
    const { operation, num1, num2 } = req.params;
    let result;

    switch (operation) {
        case 'add':
            result = parseInt(num1) + parseInt(num2);
            break;
        case 'subtract':
            result = parseInt(num1) - parseInt(num2);
            break;
        case 'multiply':
            result = parseInt(num1) * parseInt(num2);
            break;
        case 'divide':
            result = parseInt(num1) / parseInt(num2);
            break;
        default:
            result = 'Invalid operation';
    }

    res.json({
        operation: operation,
        result: result
    }); 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const express = require('express');
const axios = require('axios');
const API_KEY = 'https://api.open-meteo.com/v1/forecast'; 

app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`);
    const weather = response.data;

    res.json({
      city: city,
      temperature: `${weather.main.temp}°C`,
      status: weather.weather[0].description
    });
  } catch (error) {
    res.status(404).json({
      message: "City not found"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
