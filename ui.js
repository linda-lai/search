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

const printHeader = (inputs, results) => {
  const { entityName, field, value } = inputs;
  const border = () => console.log("=".repeat(100));

  border();
  console.log(
    `Searched ${entityName.toUpperCase()} for "${field.toUpperCase()}" field and "${value.toUpperCase()}" value. Results: ${
      results.length
    }`
  );
  border();
};

const printRelatedResults = (entityName, entity, data) => {
  if (entityName === "tickets") {
    var relatedRecords = entity.getRelatedRecords(data);

    printRecords("user", relatedRecords.users);
    printRecords("organization", relatedRecords.organizations);
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
    const relatedRecords = entity.getRelatedRecords(data);

    printRecords("user", relatedRecords.users);
    printRecords("ticket", relatedRecords.tickets);
  }
};

const printRecord = (type, record) => {
  console.log(`----------- ${type} -----------`);
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printResults = (inputs, results, data) => {
  printHeader(inputs, results);

  results.forEach((entity) => {
    printRecord(inputs.entityName, entity);
    printRelatedResults(inputs.entityName, entity, data);
  });
};

const printRecords = (entityName, records) =>
  records.forEach((record) => printRecord(entityName, record));

module.exports = { promptUser, printResults };
