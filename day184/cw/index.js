const http = require('http');

const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
];

const accounts = [
    { id: 1, name: 'beridze mate', balance: 1500 },
    { id: 2, name: 'beridze giorgi', balance: 2000 }
];

const server = http.createServer((req, res) => {
    if (req.url === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } else if (req.url === '/accounts') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(accounts));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});