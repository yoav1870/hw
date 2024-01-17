const http = require("http");
const url = require("url");
const {handleEvacuationPlanRequest} = require("./router");
const { getEvacuationPlansArray,saveEvacuationPlansArray,state,initializeEvacuationPlansArray} = require("./repository");

// my data
const evacuationPlansArray = initializeEvacuationPlansArray();
const stateJson = state();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handleEvacuationPlanRequest(req, res, parsedUrl,evacuationPlansArray,stateJson);
});

server.on("request", (req, res) => {
    res.on("finish", () => {
        if (stateJson.getIsModified()){
            saveEvacuationPlansArray(evacuationPlansArray);
            stateJson.setIsModified(false);
        }
    });
});


const port = 8080;
server.listen(port);

