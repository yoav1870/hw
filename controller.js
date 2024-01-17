const handleGet = (req, res, parsedUrl, evacuationPlansArray) => {
    const queryParamId = parsedUrl.query.id;
    if(parsedUrl.pathname === "/plans"){
        if ( !queryParamId) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(evacuationPlansArray));
        } else { 
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
            if (matchingPlan) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(matchingPlan));
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
    
};

const handlePost = (req, res, parsedUrl, evacuationPlansArray) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    


    if(parsedUrl.pathname === "/new-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                res.statusCode = 409;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id already exists");
            } else {
                let newPlan = { id: queryParamId, namePlan: queryParamName };
                evacuationPlansArray.push(newPlan);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            }
        } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad request");
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }   
};

const handlePut = (req, res, parsedUrl, evacuationPlansArray) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    if(parsedUrl.pathname === "/update-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
            if (matchingPlan) {
                matchingPlan.namePlan = queryParamName;
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
        } else {            
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad Request");
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
};

const handleDelete = (req, res, parsedUrl, evacuationPlansArray) => {
    const queryParamId = parsedUrl.query.id;
    if(parsedUrl.pathname === "/delete-plan"){
        if (queryParamId !== undefined) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                const index = evacuationPlansArray.indexOf(matchingPlan);
                evacuationPlansArray.splice(index, 1);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
        } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad Request");
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
    
};




module.exports = {
    handleGet,
    handlePost,
    handlePut,
    handleDelete
};