// TODO: Match on any value in an array
const match = (attributeValue, queryValue) => {
  const parsedQueryValue = JSON.parse(queryValue);

  if (attributeValue === undefined && parsedQueryValue === null) {
    return true;
  } else {
    return attributeValue === parsedQueryValue;
  }
};

module.exports = { match };
