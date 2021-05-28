const { search } = require("./search");

class User {
  constructor(user) {
    this.attributes = user;
  }

  match(fieldName, value) {
    return this.attributes[fieldName] === value;
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
