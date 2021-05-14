const search = (entityName, field, value, data) => {
  return data[entityName].filter((item) => item[field] === value);
};

module.exports = { search };
