const fs = require("fs");
const readlineSync = require("readline-sync");

const data = {
  tickets: JSON.parse(fs.readFileSync("tickets.json")),
  organizations: JSON.parse(fs.readFileSync("organizations.json")),
  users: JSON.parse(fs.readFileSync("users.json")),
};

const entityName = readlineSync.question(
  "Which entity would you like to search? "
);
const field = readlineSync.question("Which field would you like to search? ");
const value = readlineSync.question("Which value would you like to search? ");

if (!data[entityName]) {
  console.log("entity does not exist");
  process.exit(1);
}
var results = data[entityName].filter((item) => item[field] === value);

console.log("==================");
console.log(
  `Searched ${entityName} for ${field} field and ${value} value. Results: ${results.length}`
);
console.log("==================");

results.forEach((entity) => {
  console.log("------------------");
  Object.entries(entity).forEach((entry) => {
    var [key, value] = entry;
    console.log(`${key}:`, value);
  });
  console.log("------------------");
});
