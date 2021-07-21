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
    `\nQ: What value are you looking up? e.g. "en-AU", 123, true, null, ""\n⚠️  Note: Strings must be JSON-formatted (i.e. "admin" not admin or 'admin')\nA: `
  );

const promptUser = (data) => {
  let entityName, field, value, parsedValue;

  printPromptHeader();

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

  do {
    value = promptValue();
    try {
      parsedValue = JSON.parse(value);
    } catch (e) {
      parsedValue = e;
      console.error("❌ Invalid formatting for queried value");
    }
  } while (parsedValue instanceof SyntaxError);

  return {
    entityName,
    field,
    value: parsedValue,
  };
};

const printPromptHeader = () => {
  const border = () => "=".repeat(97);
  console.log(`${border()}\n${logo}\n${border()}\n`);
};

const printResultsSummary = (inputs, results) => {
  const { entityName, field, value } = inputs;
  const border = () => "=".repeat(97);

  console.log(
    `${border()}\nSearched ${entityName.toUpperCase()} for field: ${field} and value: ${value}. Results: ${
      results.length
    }\n${border()}`
  );
};

const printRecordHeader = () => {
  const border = () => "=".repeat(40);
  console.log(`\n${border()} MATCHING RECORD ${border()}`);
};

const printResults = (inputs, results, data) => {
  printResultsSummary(inputs, results);

  results.forEach((entity) => {
    printRecordHeader();
    printRecord(entity);
    printRelatedResults(entity, data);
  });
};

const printRecord = (record) => {
  const border = () => "*".repeat(5);

  console.log(`\n${border()} ${record.constructor.name} ${border()}`);
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRecords = (records) => {
  records && records.forEach((record) => printRecord(record));
};

const printRelatedResults = (entity, data) => {
  const border = () => "-".repeat(40);
  console.log(`\n${border()} RELATED RECORDS ${border()}`);
  printRecords(entity.getRelatedRecords(data));
};

module.exports = { promptUser, printResults };
