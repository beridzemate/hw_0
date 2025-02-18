const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

const adminRoutes = require("./routes/admins");
const productsRoutes = require("./routes/products");



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


