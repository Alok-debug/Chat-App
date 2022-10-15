const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    // console.log(req);
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" > <button type="submit" >SEND</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [] //----> to store chunks of data stream
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Try for Homepage !!! </h1></body>');
    res.write('<html>');
    res.end();
   
});
const PORT = process.env.PORT || 4000;
server.listen(PORT);
