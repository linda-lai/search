const fs = require("fs");
const Ticket = require("./ticket");
const User = require("./user");
const Organization = require("./organization");

const loadDataset = (entityName, constructor) => {
  let file, data;
  const path = `./data/${entityName}.json`;

  try {
    file = fs.readFileSync(path);
  } catch (e) {
    console.error(
      `Unable to locate or open JSON file for ${entityName} in data/${entityName}.json`
    );
    process.exit(1);
  }

  try {
    data = JSON.parse(file).map((rawEntity) => new constructor(rawEntity));
  } catch (e) {
    console.error(`Malformed JSON in ${path}: ${e.message}`);
    process.exit(1);
  }

  return data;
};

const loadDatasets = () => {
  return {
    tickets: loadDataset("tickets", Ticket),
    organizations: loadDataset("organizations", Organization),
    users: loadDataset("users", User),
  };
};

module.exports = { loadDatasets };
