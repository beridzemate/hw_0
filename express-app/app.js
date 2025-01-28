

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/items', itemsRoutes);


module.exports = app;
