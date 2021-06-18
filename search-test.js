const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, it, expect } = require("./test/test-utils");

const { mockOrganization } = require("./test/data/results");

const runTestSuite = () => {
  describe(`search for smdsk`, () => {
    let query;
    it("returns a matching object of class Organization", () => {
      query = {
        entityName: "organizations",
        field: "_id",
        value: "101",
      };
      expect(actual(query)).toDeepEqual(mockOrganization);
    });
    // query = {};
    // console.log(query);
  });

  describe(`search for smdsk`, () => {
    let query;
    it("returns a matching object of class Organization", () => {
      query = {
        entityName: "organizations",
        field: "_id",
        value: "101",
      };
      expect(actual(query)).toDeepEqual(mockOrganization);
    });
    // query = {};
    // console.log(query);
  });
};

const actual = (query) => {
  let { entityName, field, value } = query;
  return search(entityName, field, value, loadDatasets());
};

runTestSuite();
