const http = require("http");
const url = require("url");
const {handleEvacuationPlanRequest} = require("./router");




const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handleEvacuationPlanRequest(req, res, parsedUrl);
});

const port = 8080;
server.listen(port);

