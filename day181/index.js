const http = require('http');
const url = require('url');

let users = [];

const requestListener = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Title</h1></body></html>');
    } else if (parsedUrl.pathname === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (parsedUrl.pathname === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const user = JSON.parse(body);
            users.push(user);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
};

const server = http.createServer(requestListener);
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});