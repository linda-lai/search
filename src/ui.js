const readlineSync = require("readline-sync");

const promptEntityName = () =>
  readlineSync
    .question(
      "Q: Which entity are you querying?\n\n🔎 Queryable collections are:\ntickets\nusers\norganizations\n\nA: "
    )
    .toLowerCase();

const promptField = () =>
  readlineSync.question(`Q: Which field do you want to search?\nA: `);

const promptValue = () =>
  readlineSync.question(
    `\nQ: What value are you looking up? (Enter as JSON-formatted string, i.e. "en-AU", "123", "true", "null", "")\nA: `
  );

const promptUser = (data) => {
  let entityName, field;

  entityName = promptEntityName();

  while (!data[entityName]) {
    console.log("❌ Entity must be TICKETS, USERS or ORGANIZATION\n");
    entityName = promptEntityName();
  }

  const searchableFields = Object.keys(data[entityName][0].attributes);

  console.log(
    `\n🔍 Searchable fields in ${entityName.toUpperCase()} are:\n${searchableFields.join(
      "\n"
    )}\n`
  );
  field = promptField();

  while (!searchableFields.includes(field)) {
    console.log(
      `❌ Field "${field}" is not searchable in ${entityName.toUpperCase()}\n`
    );
    field = promptField();
  }

  // TODO: Could maybe be doing the JSON parsing here, and give nice user
  // friendly errors if there are parsing failures
  const value = promptValue();

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
    `Searched ${entityName.toUpperCase()} for field: ${field} and value: ${value}. Results: ${
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
