const http = require('http')

const wordList = require("./sowpods.json");

const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain')
    res.end("405: Method Not Allowed")
  }
  const getQuery = /\?query=(.*)/
  const match = req.url.match(getQuery)
  let output = [];
  if (match) {
    const query = match[1]
    const searchRegex = new RegExp(query)
    output = wordList.filter(word => searchRegex.test(word)).slice(0, 100);
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=UTF-8')
  res.end(JSON.stringify(output))
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
