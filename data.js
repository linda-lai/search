const fs = require("fs");
const Ticket = require("./ticket");
const User = require("./user");
const Organization = require("./organization");

// TODO: Extract parsing and mapping to a util/private function
const loadData = () => {
  return {
    tickets: JSON.parse(fs.readFileSync("./data/tickets.json")).map(
      (ticket) => new Ticket(ticket)
    ),
    organizations: JSON.parse(fs.readFileSync("./data/organizations.json")).map(
      (organization) => new Organization(organization)
    ),
    users: JSON.parse(fs.readFileSync("./data/users.json")).map(
      (user) => new User(user)
    ),
  };
};

module.exports = { loadData };
