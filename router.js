const { handleGet, handlePost, handlePut, handleDelete } = require("./controller");

const handleEvacuationPlanRequest = (req, res, parsedUrl, evacuationPlansArray,stateJson) => {
    const { method } = req;
    
    switch (method) {
        case "GET":
            handleGet(req, res, parsedUrl, evacuationPlansArray);
            break;
        case "POST":
            handlePost(req, res, parsedUrl, evacuationPlansArray,stateJson);
            break;
        case "PUT":
            handlePut(req, res, parsedUrl, evacuationPlansArray,stateJson);
            break;
        case "DELETE":
            handleDelete(req, res, parsedUrl, evacuationPlansArray,stateJson);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Not Found");
    }
};


module.exports = {
    handleEvacuationPlanRequest,
};