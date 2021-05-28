const { search } = require("./search");
class Organization {
  constructor(organization) {
    this.attributes = organization;
  }

  // TODO: Create parent class Entity with match behaviour
  match(fieldName, value) {
    return this.attributes[fieldName] === value;
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

    return { tickets, users };
  }
}

module.exports = Organization;
