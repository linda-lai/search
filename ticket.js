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
    const users = search("users", "_id", this.attributes.assignee_id, data);
    const organizations = search(
      "organizations",
      "_id",
      this.attributes.organization_id,
      data
    );
    return [users, organizations].flat();
  }
}

module.exports = Ticket;
