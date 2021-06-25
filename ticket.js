const { search } = require("./search");
const utils = require("./utils");

class Ticket {
  constructor(ticket) {
    // If we wanted to handle UUIDs, Dates, URI parsing it would happen here
    this.attributes = ticket;
  }

  match(queryField, queryValue) {
    return utils.match(this.attributes[queryField], queryValue);
  }

  getRelatedRecords(data) {
    const assignee = search("users", "_id", this.attributes.assignee_id, data);
    const submitter = search(
      "users",
      "_id",
      this.attributes.submitter_id,
      data
    );
    const organizations = search(
      "organizations",
      "_id",
      this.attributes.organization_id,
      data
    );
    return [assignee, submitter, organizations].flat();
  }
}

module.exports = Ticket;
