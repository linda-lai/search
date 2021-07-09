const readlineSync = require("readline-sync");

const promptUser = (data) => {
  // Not validating that it's a correct entity or field
  const entityName = readlineSync.question("Which entity are you searching? ");
  const field = readlineSync.question("Which field do you want to lookup? ");
  // Could maybe be doing the JSON parsing here, and giving nice user friendly errors if there are parsing failures
  const value = readlineSync.question(
    `What value do you need? (Enter value as JSON, e.g. "incident", "123", "true") `
  );

  // Maybe do this check before asking for the field. And let them retry rather than exiting.
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
  printHeader(inputs, results);

  results.forEach((entity) => {
    printRecord(entity);
    printRelatedResults(entity, data);
  });
};

const printHeader = (inputs, results) => {
  const { entityName, field, value } = inputs;
  const border = () => console.log("=".repeat(100));

  border();
  console.log(
    `Searched ${entityName.toUpperCase()} for "${field}" field and "${value}" value.Results: ${
      results.length
    }`
  );
  border();
};

const printRecords = (records) => {
  records && records.forEach((record) => printRecord(record));
};

const printRecord = (record) => {
  console.log("-".repeat(25), record.constructor.name, "-".repeat(25));
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRelatedResults = (entity, data) => {
  printRecords(entity.getRelatedRecords(data));
};

module.exports = { promptUser, printResults };
