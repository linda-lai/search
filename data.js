const fs = require("fs");
const Ticket = require("./ticket");
const User = require("./user");
const Organization = require("./organization");

const loadDataset = (entityName, constructor) => {
  return JSON.parse(fs.readFileSync(`./data/${entityName}.json`)).map(
    (rawEntity) => new constructor(rawEntity)
  );
};

const loadDatasets = () => {
  return {
    tickets: loadDataset("tickets", Ticket),
    organizations: loadDataset("organizations", Organization),
    users: loadDataset("users", User),
  };
};

module.exports = { loadDatasets };
