const fs = require("fs");
const path = require("path");

const repositoryFilePath = path.join(__dirname, "repository.json");

const getEvacuationPlansArray = () => {
    try {
        const data = fs.readFileSync(repositoryFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading repository file:", error);
        return [];
    }
};

const saveEvacuationPlansArray = (evacuationPlansArray) => {
    try {
        const data = JSON.stringify(evacuationPlansArray, null, 2);
        fs.writeFileSync(repositoryFilePath, data, "utf-8");
    } catch (error) {
        console.error("Error writing to repository file:", error);
    }
};

module.exports = {
    getEvacuationPlansArray,
    saveEvacuationPlansArray,
};
