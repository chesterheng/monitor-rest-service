const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  // parsedUrl = http://localhost:3000/myapp/?search=test
  const parsedUrl = url.parse(req.url, true);

  // path = /myapp/
  const path = parsedUrl.pathname;

  // match '/' from start of the pathname or
  // match '/' from end of the pathname
  // trimmedPath = myapp
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // queryStringObject = { search: 'test' }
  const queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();

  res.end("Hello World\n");
});

server.listen(3000, function () {
  console.log("The server is listening on port 3000");
});
