// TODO: Match on any value in an array
// TODO: Undefined attributeValue should match `null` queryValues
// (i.e). if an attribute doesn't exist, the input will be treated as if `null` was searched
const match = (attributeValue, queryValue) => {
  return attributeValue === JSON.parse(queryValue);
};

module.exports = { match };
