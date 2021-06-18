const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, it, expect } = require("./test/test-utils");
// const { describe, it, expect } = require("./test/test-utils-v1");
// const assert = require("assert"); //https://nodejs.org/api/assert.html#assert_assert
const { mockOrganization } = require("./test/data/results");

// INPUTS for search() are entityName, field, value, and data object
// OUTPUT for search() is an array with a collection of records (including a single record) matching the query field and value for an entity

// let actual, expected, query;

// query = {
//   entityName: "organizations",
//   field: "_id",
//   value: "101",
// };

// let { entityName, field, value } = query;

// actual = search(entityName, field, value, loadDatasets());
// expected = mockOrganization;

// console.log(`SEARCHED field: ${field} for value: ${value} in ${entityName}`);

const runTestSuite = () => {
  describe("search for organization", () => {
    let actual, expected, query;
    query = {
      entityName: "organizations",
      field: "_id",
      value: "101",
    };
    let { entityName, field, value } = query;
    // console.log(
    //   `SEARCHED field: ${field} for value: ${value} in ${entityName}`
    // );
    it("returns a matching object of class Organization", () => {
      actual = search(entityName, field, value, loadDatasets());
      expected = mockOrganization;
      expect(actual).toDeepEqual(expected);
    });
  });
};

runTestSuite();

// console.log(results[0].attributes);
