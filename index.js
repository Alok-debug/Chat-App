const http = require("http");
const path = require("path");
const fs = require("fs");
const routes = require('./routes');



const server = http.createServer(routes);
const PORT = process.env.PORT || 4000;
server.listen(PORT);
