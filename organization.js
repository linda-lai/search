const { search } = require("./search");
const utils = require("./utils");

class Organization {
  constructor(organization) {
    this.attributes = organization;
  }

  match(queryField, queryValue) {
    return utils.match(this.attributes[queryField], queryValue);
  }

  getRelatedRecords(data) {
    const tickets = search(
      "tickets",
      "organization_id",
      this.attributes._id,
      data
    );

    const users = search("users", "organization_id", this.attributes._id, data);
    console.log(tickets, users);

    return [tickets, users].flat();
  }
}

module.exports = Organization;
