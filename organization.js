class Organization {
  constructor(organization) {
    this.attributes = organization;
  }

  // TODO: Create parent class Entity with match behaviour
  match(fieldName, value) {
    return this.attributes[fieldName] === value;
  }
}

module.exports = Organization;
