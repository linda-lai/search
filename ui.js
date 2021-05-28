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

const printResults = (inputs, results, data) => {
  printHeader(inputs, results);

  results.forEach((entity) => {
    printRecord(entity);
    printRelatedResults(entity, data);
  });
};

const printRelatedResults = (entity, data) => {
  printRecords(entity.getRelatedRecords(data));
};

const printRecords = (records) => {
  records && records.forEach((record) => printRecord(record));
};

const printRecord = (record) => {
  console.log(`----------- ${record.constructor.name} -----------`);
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

module.exports = { promptUser, printResults };
