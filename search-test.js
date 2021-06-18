const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, it } = require("./test/test-utils");
const assert = require("assert"); //https://nodejs.org/api/assert.html#assert_assert
const { mockOrganization } = require("./test/data/results");

// INPUTS for search() are entityName, field, value, and data object
// OUTPUT for search() is an array of records or a single record matching the query field and value for an entity

// const equalTo = (actual, expected) => {
//   assert.deepStrictEqual(actual, [expected]);
// };

// const expect = (message, query, expected) => {
//   // ARRANGE
//   let { entityName, field, value } = query;
//   let actual;

//   // ACT
//   actual = search(entityName, field, value, loadDatasets());
//   console.log(actual);

//   const error = equalTo(actual, expected);

//   console.log(message);
//   console.log(`SEARCHED field: ${field} for value: ${value} in ${entityName}`);

//   if (!error) {
//     console.log(`RESULT: SUCCESS ✅`);
//   } else {
//     console.log(`RESULT: FAILURE`);
//   }
// };

// const expect2 = (actual) => ({
//   toDeepEqual: (expected) => {
//     assert.deepStrictEqual(actual, [expected]);
//   },
// });

const expect = (actual, expected) => {
  const error = assert.deepStrictEqual(actual, expected);

  return error;

  console.log(error);
};

const runTestSuite = () => {
  let actual, expected, query;

  query = {
    entityName: "organizations",
    field: "_id",
    value: "101",
  };

  let { entityName, field, value } = query;

  actual = search(entityName, field, value, loadDatasets());
  expected = mockOrganization;

  console.log(`SEARCHED field: ${field} for value: ${value} in ${entityName}`);
  // console.log(query);
  // console.log(mockOrganization);
  console.log("---------");

  describe("testing describe block", () => {
    it("shows the it block", () => {
      console.log(actual);
      console.log(expected);
      error = expect(actual, [expected]);
      if (!error) {
        console.log(`RESULT: SUCCESS ✅`);
      } else {
        console.log(`RESULT: FAILURE`);
      }
    });
    // expect(
    //   "search module doesn't return an error if valid query",
    //   query,
    //   (expected = mockOrganization)
    // );
  });

  // query = {};
};

runTestSuite();

// // [Organization { attributes: { _id: 106 } }]
// console.log(results[0].attributes);
