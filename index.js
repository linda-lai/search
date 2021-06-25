const { promptUser, printResults } = require("./ui");
const { search } = require("./search");
const { loadDatasets } = require("./data");

const data = loadDatasets();
// const query = promptUser(data);
// TODO: Write test for records which are missing related entity ID
const query = {
  entityName: "tickets",
  field: "_id",
  value: '"17951590-6a78-49e8-8e45-1d4326ba49cc"',
};
// const query = {
//   entityName: "tickets",
//   field: "organization_id",
//   value: 112,
// };
const { entityName, field, value } = query;
const results = search(entityName, field, value, data);
printResults(query, results, data);

// TODO: Handle non-string data types
