const fs = require("fs");
const Ticket = require("./ticket");
const User = require("./user");
const Organization = require("./organization");

// TODO: Could do this asynchronously to reduce load time while promptUser runs
// https://nodejs.org/api/fs.html#fs_filehandle_readfile_options
const loadDataset = (entityName, constructor) => {
  let data;
  let path = `./data/${entityName}.json`;

  try {
    file = fs.readFileSync(path);
  } catch (e) {
    console.error(
      `Missing JSON file for ${entityName} in data/${entityName}.json`
    );
    process.exit(1);
  }

  try {
    data = JSON.parse(file).map((rawEntity) => new constructor(rawEntity));
  } catch (e) {
    console.error(`Malformed JSON in ${file}: ${e}`);
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
