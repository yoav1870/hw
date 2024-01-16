const http = require("http");
const url = require("url");
const {  handleEvacuationPlanRequest,initializeEvacuationPlansArray,saveEvacuationPlansArray} = require("./router");


const evacuationPlansArray = initializeEvacuationPlansArray();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handleEvacuationPlanRequest(req, res, parsedUrl,evacuationPlansArray);
});

const port = 8080;
server.listen(port);


server.on("request", (req, res) => {
    res.on("finish", () => {
        saveEvacuationPlansArray(evacuationPlansArray);
    });
});
