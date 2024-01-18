const { getEvacuationPlansArray, saveEvacuationPlansArray , initializeEvacuationPlansArray } = require("./repository");
const winston = require('winston');

// my data
const evacuationPlansArray = initializeEvacuationPlansArray();

//  Winston 
const seccussLog = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'seccuss.log' }),  
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

const errorLog = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'error.log' }),  
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  });
  

const handleGet = (req, res, parsedUrl) => {
    
    const queryParamId = parsedUrl.query.id;
    if(parsedUrl.pathname === "/plans"){
        
        if (queryParamId) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
            if (matchingPlan) {
                seccussLog.info('Handling GET request');
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(matchingPlan));
            } else {
                errorLog.error('Handling GET request : conflict');
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
            
        }else{
            if(queryParamId === ''){ 
                errorLog.error('Handling GET request : bad request');
                res.statusCode = 400;
                res.setHeader("Content-Type", "text/plain");
                res.end("Bad Request");
            }else{
                seccussLog.info('Handling GET request');
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            }
        }      
    }else{
        errorLog.error('Handling GET request : not found');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
};

const handlePost = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    


    if(parsedUrl.pathname === "/new-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined && queryParamId !== '' && queryParamName !== '') {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                errorLog.error('Handling POST request : conflict');
                res.statusCode = 409;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id already exists");
            } else {
                seccussLog.info('Handling POST request');
                let newPlan = { id: queryParamId, namePlan: queryParamName };
                evacuationPlansArray.push(newPlan);
                saveEvacuationPlansArray(evacuationPlansArray);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            }
        } else {
            errorLog.error('Handling POST request : bad request');
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad request");
        }
    }else{
        errorLog.error('Handling POST request :not found');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }   
};

const handlePut = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    const queryParamName = parsedUrl.query.namePlan;
    
    if(parsedUrl.pathname === "/update-plan"){
        if (queryParamId !== undefined && queryParamName !== undefined && queryParamId !== '' && queryParamName !== '') {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
            if (matchingPlan) {
                seccussLog.info('Handling PUT request');
                matchingPlan.namePlan = queryParamName;
                saveEvacuationPlansArray(evacuationPlansArray);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            } else {
                errorLog.error('Handling PUT request : conflict');
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
        } else {  
            errorLog.error('Handling PUT request : bad request');          
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad Request");
        }
    }else{
        errorLog.error('Handling PUT request : not found');
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
    }
};

const handleDelete = (req, res, parsedUrl) => {
    const queryParamId = parsedUrl.query.id;
    
    if(parsedUrl.pathname === "/delete-plan"){
        if (queryParamId !== undefined) {
            const matchingPlan = evacuationPlansArray.find(plan => plan.id == queryParamId);
    
            if (matchingPlan) {
                seccussLog.info('Handling DELETE request');
                const index = evacuationPlansArray.indexOf(matchingPlan);
                evacuationPlansArray.splice(index, 1);
                saveEvacuationPlansArray(evacuationPlansArray);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(evacuationPlansArray));
            } else {
                errorLog.error('Handling DELETE request : conflict');
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Plan with the specified id not found");
            }
        } else {
            errorLog.error('Handling DELETE request : bad request');
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad Request");
        }
    }else{
        errorLog.error('Handling DELETE request : not found');
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