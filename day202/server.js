const express = require('express');

const app = express();
const port = 3000;

// Logger Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Auth Middleware
const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === 'your-secret-key') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

// Apply middlewares
app.use(logger);
app.use(auth);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the public route!');
});

app.get('/products', (req, res) => {
    res.send('Welcome to the products route!');
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});