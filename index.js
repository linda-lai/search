const { promptUser, printResults } = require("./ui");
const { search } = require("./search");
const { loadData } = require("./data");

const data = loadData();
const query = promptUser(data);
const { entityName, field, value } = query;
const results = search(entityName, field, value, data);
printResults(query, results, data);
