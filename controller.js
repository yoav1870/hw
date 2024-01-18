const { getEvacuationPlansArray, saveEvacuationPlansArray , initializeEvacuationPlansArray } = require("./repository");
const winston = require('winston');

// my data
const evacuationPlansArray = initializeEvacuationPlansArray();

//  Winston 
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'index.log' }),  
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});



const handleGet = (req, res, parsedUrl) => {
    logger.info('Handling GET request');
    const queryParamId = parsedUrl.query.id;
    if(parsedUrl.pathname === "/plans"){
        
        if (queryParamId) {
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
            
        }else{
            if(queryParamId === ''){ 
                res.statusCode = 400;
                res.setHeader("Content-Type", "text/plain");
                res.end("Bad Request");
            }else{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            }
        }      
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
};

const handlePost = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    logger.info('Handling POST request');


    if(parsedUrl.pathname === "/new-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined && queryParamId !== '' && queryParamName !== '') {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                res.statusCode = 409;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id already exists");
            } else {
                let newPlan = { id: queryParamId, namePlan: queryParamName };
                evacuationPlansArray.push(newPlan);
                saveEvacuationPlansArray(evacuationPlansArray);
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

const handlePut = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    logger.info('Handling PUT request');
    if(parsedUrl.pathname === "/update-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined && queryParamId !== '' && queryParamName !== '') {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
            if (matchingPlan) {
                matchingPlan.namePlan = queryParamName;
                saveEvacuationPlansArray(evacuationPlansArray);
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

const handleDelete = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    logger.info('Handling DELETE request');
    if(parsedUrl.pathname === "/delete-plan"){
        if (queryParamId !== undefined) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                const index = evacuationPlansArray.indexOf(matchingPlan);
                evacuationPlansArray.splice(index, 1);
                saveEvacuationPlansArray(evacuationPlansArray);
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