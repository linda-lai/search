const readlineSync = require("readline-sync");

const promptEntityName = () =>
  readlineSync
    .question("Q: Which entity are you searching?\nA: ")
    .toLowerCase();

const promptField = () =>
  readlineSync.question(`Q: Which field do you want to lookup?\nA: `);

const promptValue = () =>
  readlineSync.question(
    `Q: What value do you need? (Enter value as JSON-formatted string, i.e. "incident", "123", "true")\nA: `
  );

const promptUser = (data) => {
  let entityName, field;

  entityName = promptEntityName();

  while (!data[entityName]) {
    console.log("❌ Entity must be tickets, users or organization\n");
    entityName = promptEntityName();
  }

  const searchableFields = Object.keys(data[entityName][0].attributes);

  console.log(
    `\n🔍 Searchable fields in ${entityName} are:\n${searchableFields.join(
      "\n"
    )}\n`
  );
  field = promptField();

  while (!searchableFields.includes(field)) {
    console.log(`❌ Field ${field} is not searchable in ${entityName}\n`);
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
