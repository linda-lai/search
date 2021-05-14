const { search } = require("./search");

const readlineSync = require("readline-sync");

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

const printRecord = (type, record) => {
  console.log(`----------- ${type} -----------`);
  record &&
    Object.entries(record).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRecords = (entityName, records) =>
  records.forEach((record) => printRecord(entityName, record));

module.exports = { promptUser, printResults };
