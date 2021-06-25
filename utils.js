// TODO: Match on any value in an array
const match = (attributeValue, queryValue) => {
  const parsedQueryValue = JSON.parse(queryValue);

  if (Array.isArray(attributeValue)) {
    return attributeValue.includes(parsedQueryValue);
  } else if (attributeValue === undefined && parsedQueryValue === null) {
    return true;
  } else {
    return attributeValue === parsedQueryValue;
  }
};

module.exports = { match };
