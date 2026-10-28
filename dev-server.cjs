'use strict';
// Serve the built, self-contained demo only; never expose the source directory.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, 'index.html'));
const port = Number(process.env.PORT || 4173);
http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, {Allow: 'GET, HEAD'}).end();
    return;
  }
  if (request.url.split('?')[0] !== '/' && request.url.split('?')[0] !== '/index.html') {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff'});
  response.end(request.method === 'HEAD' ? undefined : page);
}).listen(port, '0.0.0.0', () => console.log(`Payment Milestone Studio: http://localhost:${port}`));
