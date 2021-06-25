// TODO: Match on any value in an array
// TODO: Undefined attributeValue should match `null` queryValues
// (i.e). if an attribute doesn't exist, the input will be treated as if `null` was searched
const match = (attributeValue, queryValue) => {
  // !attributeValue === "null"

  if (!attributeValue && queryValue == "null") {
    return true;
  } else {
    return attributeValue === JSON.parse(queryValue);
  }
};

module.exports = { match };

// If the user is searching for null
// And the value is null or undefined
// Then we DO want to return it as a result
