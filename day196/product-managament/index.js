const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());

const productsFilePath = path.join(__dirname, 'products.json');

const readProducts = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};


app.get('/products', (req, res) => {
    const { sort, minPrice, maxPrice, limit } = req.query;
    let products = readProducts();

    
    if (minPrice) {
        products = products.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        products = products.filter(product => product.price <= parseFloat(maxPrice));
    }

    
    if (sort === 'ascending') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'descending') {
        products.sort((a, b) => b.price - a.price);
    }

    
    if (limit) {
        products = products.slice(0, parseInt(limit));
    }

    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    const products = readProducts();
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price)
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (name) {
        products[productIndex].name = name;
    }
    if (price) {
        products[productIndex].price = parseFloat(price);
    }

    writeProducts(products);

    res.json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(productIndex, 1);
    writeProducts(products);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});