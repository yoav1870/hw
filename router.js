const { handleGet, handlePost, handlePut, handleDelete } = require("./controller");

const handleEvacuationPlanRequest = (req, res, parsedUrl) => {
    const { method } = req;
    
    switch (method) {
        case "GET":
            handleGet(req, res, parsedUrl);
            break;
        case "POST":
            handlePost(req, res, parsedUrl);
            break;
        case "PUT":
            handlePut(req, res, parsedUrl);
            break;
        case "DELETE":
            handleDelete(req, res, parsedUrl);
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