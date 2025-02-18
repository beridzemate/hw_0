const express  = require("express");
const productsRouter = expressRouter();

app.get('/', (req,res) => {
    res.json({message: 'products'})
});

app.post('/add', (req,res) =>{
    res.json({message: 'product added'})
});


export default productsRouter;