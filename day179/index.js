const http = require('http');

const PORT = 5500;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from server');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});