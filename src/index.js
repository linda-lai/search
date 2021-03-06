const { promptUser, printResults } = require("./ui");
const { search } = require("./search");
const { loadDatasets } = require("./data");

const data = loadDatasets();
const query = promptUser(data);
const { entityName, field, value } = query;
const results = search(entityName, field, value, data);
printResults(query, results, data);
