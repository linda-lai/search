const search = (entityName, field, value, data) => {
  return data[entityName].filter((item) => item.match(field, value));
};

module.exports = { search };
