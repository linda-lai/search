const readlineSync = require("readline-sync");
const { logo, border } = require("./utils");

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
  console.log(`${border("=", 97)}\n${logo}\n${border("=", 97)}\n`);
};

const printResultsSummary = (inputs, results) => {
  const { entityName, field, value } = inputs;

  console.log(
    `${border(
      "=",
      97
    )}\nSearched ${entityName.toUpperCase()} for field: ${field} and value: ${value}. Results: ${
      results.length
    }\n${border("=", 97)}`
  );
};

const printRecordHeader = () => {
  console.log(`\n${border("=", 40)} MATCHING RECORD ${border("=", 40)}`);
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
  console.log(
    `\n${border("*", 5)} ${record.constructor.name} ${border("*", 5)}`
  );
  record &&
    Object.entries(record.attributes).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
};

const printRecords = (records) => {
  records && records.forEach((record) => printRecord(record));
};

const printRelatedResults = (entity, data) => {
  console.log(`\n${border("—", 40)} RELATED RECORDS ${border("—", 40)}`);
  printRecords(entity.getRelatedRecords(data));
};

module.exports = { promptUser, printResults };
