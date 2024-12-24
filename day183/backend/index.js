const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors());

app.get('/products', (req, res) => {
    const products = [
        {id: 1, name: 'laptop 1', price: 1000},
        {id: 2, name: 'laptop 2', price: 2000},
        {id: 3, name: 'laptop 3', price: 3000}
];
res.json(products);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
