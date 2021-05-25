const { search } = require("./search");

class Ticket {
  constructor(ticket) {
    this.attributes = ticket;
  }

  match(fieldName, value) {
    return this.attributes[fieldName] === value;
  }

  // TODO: Talk through making this just return the records rather than printing them
  getRelatedRecords(data) {
    const [user] = search("users", "_id", this.attributes.assignee_id, data);
    const [organization] = search(
      "organizations",
      "_id",
      this.attributes.organization_id,
      data
    );
    return [user, organization];
  }
}

module.exports = Ticket;
