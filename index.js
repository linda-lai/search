const { promptUser, printResults } = require("./ui");
const { search } = require("./search");
const { loadData } = require("./data");

const data = loadData();
// const query = promptUser(data);

const query = {
  entityName: "tickets",
  field: "_id",
  value: "50f3fdbd-f8a6-481d-9bf7-572972856628",
};

// TODO: Handle non-string data types
// const query = {
//   entityName: "organizations",
//   field: "name",
//   value: "Qualitern",
// };

const { entityName, field, value } = query;

const results = search(entityName, field, value, data);
printResults(query, results, data);
