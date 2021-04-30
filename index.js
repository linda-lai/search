const fs = require("fs");
const readlineSync = require("readline-sync");

let tickets = JSON.parse(fs.readFileSync("tickets.json"));
let organizations = JSON.parse(fs.readFileSync("organizations.json"));
let users = JSON.parse(fs.readFileSync("users.json"));
// console.log(tickets[0]);
// console.log(organizations[0]);
// console.log(users[0]);

const entity = readlineSync.question("Which entity would you like to search? ");
const field = readlineSync.question("Which field would you like to search? ");
const value = readlineSync.question("Which value would you like to search? ");

// console.log(entity, field, value);
// console.log(users[0]._id);
// const result = users.filter((user) => user[field] === value);

let result;
switch (entity) {
  case "tickets":
    result = tickets.filter((ticket) => ticket[field] === value);
    break;
  case "users":
    result = users.filter((user) => user[field] === value);
    break;
  case "organizations":
    result = organizations.filter(
      (organization) => organization[field] === value
    );
  default:
    "No bueno";
}
console.log(result.length);
