const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/product', (req, res) => {
    const product = req.body;
    // Here you can add code to handle the product document, e.g., save it to a database
    console.log('Received product:', product);
    res.status(201).send('Product received');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
