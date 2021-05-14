const fs = require("fs");

const loadData = () => {
  return {
    tickets: JSON.parse(fs.readFileSync("./data/tickets.json")),
    organizations: JSON.parse(fs.readFileSync("./data/organizations.json")),
    users: JSON.parse(fs.readFileSync("./data/users.json")),
  };
};

module.exports = { loadData };
