const { search } = require("./search");
const utils = require("./utils");

class Ticket {
  constructor(ticket) {
    this.attributes = ticket;
  }

  match(queryField, queryValue) {
    return utils.match(this.attributes[queryField], queryValue);
  }

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
