const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

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

  // headers = {
  //   'user-agent': 'vscode-restclient',
  //   'content-type': 'application/json',
  //   'accept-encoding': 'gzip, deflate',
  //   host: 'localhost:3000',
  //   connection: 'close'
  // }
  const headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();
    res.end("Hello World\n");
    console.log(buffer);
  });
});

server.listen(3000, function () {
  console.log("The server is listening on port 3000");
});
