const readlineSync = require("readline-sync");
const { logo } = require("./utils");

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
    `\nQ: What value are you looking up? e.g. "en-AU", 123, true, null, ""\n⚠️  Note: Strings must be JSON-formatted (i.e. "admin" not 'admin')\nA: `
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

const printSummaryHeader = (inputs, results) => {
  const { entityName, field, value } = inputs;
  const border = () => console.log("=".repeat(97));

  border();
  console.log(
    `\nSearched ${entityName.toUpperCase()} for field: ${field} and value: ${value}. Results: ${
      results.length
    }\n`
  );
  border();
};

const printRecordHeader = () => {
  console.log(`\n${"=".repeat(40)} MATCHING RECORD ${"=".repeat(40)}`);
};

const printResults = (inputs, results, data) => {
  printSummaryHeader(inputs, results);

  results.forEach((entity) => {
    printRecordHeader();
    printRecord(entity);
    printRelatedResults(entity, data);
  });
};

const printRecord = (record) => {
  console.log(`\n${"*".repeat(5)} ${record.constructor.name} ${"*".repeat(5)}`);
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRecords = (records) => {
  records && records.forEach((record) => printRecord(record));
};

const printRelatedResults = (entity, data) => {
  console.log(`\n${"-".repeat(40)} RELATED RECORDS ${"-".repeat(40)}`);
  printRecords(entity.getRelatedRecords(data));
};

module.exports = { promptUser, printResults };
