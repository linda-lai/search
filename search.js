const search = (entityName, field, value, data) => {
  return value
    ? data[entityName].filter((item) => item.match(field, value))
    : [];
};

module.exports = { search };
