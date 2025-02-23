const express = require('express');

const app = express();
app.use(express.json()); 


const products = [
    { id: 1, name: '1', price: 10 },
    { id: 2, name: '2', price: 12 },
];

app.post('/users/register', (req, res) => {
    res.json({ message: 'User registered successfully' });
});

app.post('/users/login', (req, res) => {
    res.json({ message: 'User logged in successfully' });
});


app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
