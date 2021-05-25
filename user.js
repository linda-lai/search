class User {
  constructor(user) {
    this.attributes = user;
  }

  match(fieldName, value) {
    return this.attributes[fieldName] === value;
  }
}

module.exports = User;
