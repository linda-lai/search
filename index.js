const { promptUser, printResults } = require("./ui");
const { search } = require("./search");
const { loadDatasets } = require("./data");

const data = loadDatasets();
const query = promptUser(data);
const { entityName, field, value } = query;
const results = search(entityName, field, value, data);
printResults(query, results, data);

// TODO: Document how we handle (if at all) date values (like timezones)
// NOTE: No indexing.
// TODO: Test the speed and mention that it wasn't necessary in the readme

// TODO: Move source files into src/ directory
// Move tests into their own folder
