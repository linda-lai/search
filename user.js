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
    const tickets = search("tickets", "assignee_id", this.attributes._id, data);

    return [organizations, tickets].flat();
  }
}

module.exports = User;
