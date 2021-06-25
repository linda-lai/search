const search = (entityName, field, value, data) => {
  // If you did the JSON parsing earlier then you would have to deal with:
  // What if the value is false here? We should be able to search and have results for false
  // Or... using null to find null
  return value
    ? data[entityName].filter((item) => item.match(field, value))
    : [];
};

module.exports = { search };
