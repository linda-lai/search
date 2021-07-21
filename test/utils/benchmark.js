const fs = require("fs");
const Ticket = require("../../src/ticket");
const User = require("../../src/user");
const Organization = require("../../src/organization");

const { search } = require("../../src/search");

const loadDataset = (entityName, constructor) => {
  return JSON.parse(fs.readFileSync(`./data/${entityName}.json`)).map(
    (rawEntity) => new constructor(rawEntity)
  );
};

const defaultData = {
  tickets: loadDataset("tickets", Ticket),
  organizations: loadDataset("organizations", Organization),
  users: loadDataset("users", User),
};

const largeData = {
  tickets: loadDataset("tickets", Ticket),
  organizations: loadDataset("organizations", Organization),
  users: loadDataset("large-users", User),
};

const benchmark = (data, benchmarkLabel) => {
  const query = {
    entityName: "users",
    field: "signature",
    value: "Don't Worry Be Happy!",
  };
  const { entityName, field, value } = query;
  console.time(benchmarkLabel);
  const results = search(entityName, field, value, data);
  console.timeEnd(benchmarkLabel);
  console.log(`matching results: ${results.length}\n`);
};

benchmark(defaultData, "benchmarkDefaultData");
benchmark(largeData, "benchmarkLargeData");
