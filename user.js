const { search } = require("./search");
const utils = require("./utils");

class User {
  constructor(user) {
    this.attributes = user;
  }

  match(queryField, queryValue) {
    return utils.match(this.attributes[queryField], queryValue);
  }

  getRelatedRecords(data) {
    const organizations = search(
      "organizations",
      "_id",
      this.attributes.organization_id,
      data
    );
    const assigned_tickets = search(
      "tickets",
      "assignee_id",
      this.attributes._id,
      data
    );
    const submitted_tickets = search(
      "tickets",
      "submitter_id",
      this.attributes._id,
      data
    );

    return [organizations, assigned_tickets, submitted_tickets].flat();
  }
}

module.exports = User;
