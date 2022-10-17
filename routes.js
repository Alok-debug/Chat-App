const http = require("http");
const path = require("path");
const fs = require("fs");
const { off } = require("process");

const routes = (req, res) => {
  // console.log(req);
    const url = req.url;
    const method = req.method;
    console.log('check');
  if (url === "/") {
    if (fs.existsSync(path.join(__dirname, "/public", "message.txt"))) {
      fs.readFile(
        path.join(__dirname, "/public", "message.txt"),
        "utf-8",
        (err, content) => {
          if (err) throw err;
            console.log("reading.....");
            console.log(content);
          res.writeHead(200, { "content-type": "text/html" });
          res.end(content);
        }
      );
    }

    res.write("<html>");
    res.write("<head><title> Enter Message</title></head>");
    res.write(
      '<body><form action="/public/message" method="POST" autocomplete="off"><input type="text" name="message" > <button type="submit" >SEND</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/public/message" && method === "POST") {
    const body = []; //----> to store chunks of data stream
    req.on("data", (chunk) => {
      //console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile(
        path.join(__dirname, "/public", "message.txt"),
        message,
        (err) => {
          res.statusCode = 302;
          //res.setHeader('location','/');
          return res.end();
        }
      );
      return res.end();
    });
  }

  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Try for Homepage !!! </h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = routes;

// const obj = {
//     value1:routes
// }
// module.exports = obj;//-----> will be opened as obj.value1
