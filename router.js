const { getEvacuationPlansArray, saveEvacuationPlansArray } = require("./repository");
const { handleGet, handlePost, handlePut, handleDelete } = require("./controller");

const initializeEvacuationPlansArray = () => {
    return getEvacuationPlansArray();
};

const handleEvacuationPlanRequest = (req, res, parsedUrl, evacuationPlansArray) => {
    const { method } = req;
    
    switch (method) {
        case "GET":
            handleGet(req, res, parsedUrl, evacuationPlansArray);
            break;
        case "POST":
            handlePost(req, res, parsedUrl, evacuationPlansArray);
            break;
        case "PUT":
            handlePut(req, res, parsedUrl, evacuationPlansArray);
            break;
        case "DELETE":
            handleDelete(req, res, parsedUrl, evacuationPlansArray);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Not Found");
    }
};


module.exports = {
    handleEvacuationPlanRequest,
    initializeEvacuationPlansArray,
    saveEvacuationPlansArray
};