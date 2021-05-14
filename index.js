const fs = require("fs");
const readlineSync = require("readline-sync");

// const data = {
//   tickets: JSON.parse(fs.readFileSync("./data/tickets.json")),
//   organizations: JSON.parse(fs.readFileSync("./data/organizations.json")),
//   users: JSON.parse(fs.readFileSync("./data/users.json")),
// };

// loadData()
const loadData = () => {
  return {
    tickets: JSON.parse(fs.readFileSync("./data/tickets.json")),
    organizations: JSON.parse(fs.readFileSync("./data/organizations.json")),
    users: JSON.parse(fs.readFileSync("./data/users.json")),
  };
};

// promptUser()
const promptUser = (data) => {
  const entityName = readlineSync.question(
    "Which entity would you like to search? "
  );
  const field = readlineSync.question("Which field would you like to search? ");
  const value = readlineSync.question("Which value would you like to search? ");

  if (!data[entityName]) {
    console.log("entity does not exist");
    process.exit(1);
  }

  return {
    entityName,
    field,
    value,
  };
};

// const entityName = readlineSync.question(
//   "Which entity would you like to search? "
// );
// const field = readlineSync.question("Which field would you like to search? ");
// const value = readlineSync.question("Which value would you like to search? ");

// if (!data[entityName]) {
//   console.log("entity does not exist");
//   process.exit(1);
// }

// // searchEntities()
// const search = (entityName, field, value) =>
//   data[entityName].filter((item) => item[field] === value);

// const results = search(entityName, field, value);

const search = (entityName, field, value, data) => {
  // const { entityName, field, value } = inputs;

  return data[entityName].filter((item) => item[field] === value);
};

// printResults()

// TODO:
const printResults = (inputs, results, data) => {
  const { entityName, field, value } = inputs;
  const border = () => console.log("=".repeat(100));

  border();
  console.log(
    `Searched ${entityName.toUpperCase()} for "${field.toUpperCase()}" field and "${value.toUpperCase()}" value. Results: ${
      results.length
    }`
  );
  border();

  results.forEach((entity) => {
    printRecord(entityName, entity);
    border();

    if (entityName === "tickets") {
      const [user] = search("users", "_id", entity.assignee_id, data);
      const [organization] = search(
        "organizations",
        "_id",
        entity.organization_id,
        data
      );
      printRecord("user", user);
      printRecord("organization", organization);
    }

    if (entityName === "users") {
      const [organization] = search(
        "organizations",
        "_id",
        entity.organization_id,
        data
      );
      printRecord("organization", organization);

      const tickets = search("tickets", "assignee_id", entity._id, data);
      printRecords("ticket", tickets);
    }

    if (entityName === "organizations") {
      const tickets = search("tickets", "organization_id", entity._id, data);
      printRecords("ticket", tickets);

      const users = search("users", "organization_id", entity._id, data);
      printRecords("user", users);
    }
  });
};

// const border = () => console.log("=".repeat(100));

// border();
// console.log(
//   `Searched ${entityName.toUpperCase()} for "${field.toUpperCase()}" field and "${value.toUpperCase()}" value. Results: ${
//     results.length
//   }`
// );
// border();

const printRecord = (type, record) => {
  console.log(`----------- ${type} -----------`);
  record &&
    Object.entries(record).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRecords = (entityName, records) =>
  records.forEach((record) => printRecord(entityName, record));

function run() {
  const data = loadData();
  const inputs = promptUser(data);
  const { entityName, field, value } = inputs;
  const results = search(entityName, field, value, data);
  console.log(results);
  printResults(inputs, results, data);
}

// function run() {
//   const data = loadData();
//   const searchInputs = promptUser();
//   const results = searchEntities(inputs, data);
//   printResults(results);
// }

run();
