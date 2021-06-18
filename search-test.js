const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, it, expect } = require("./test/test-utils");

const { mockOrganization, mockUsers } = require("./test/data/results");

const runTestSuite = () => {
  console.log(`=`.repeat(80));
  console.log(`RUNNING TESTS FOR: ${__filename}`);

  let query;

  // -----------------------------------
  query = {
    entityName: "organizations",
    field: "_id",
    value: 101,
  };

  message(query);
  describe("search", () => {
    // printQuery(query);
    it(`finds results for _id field and 101 value as integer`, () => {
      expect(actual(query)).toDeepEqual(mockOrganization);
    });
    cleanup(query);
  });

  // -----------------------------------
  query = {
    entityName: "organizations",
    field: "_id",
    value: "101",
  };
  message(query);
  describe("search", () => {
    it(`finds results for _id field and 101 value as string`, () => {
      expect(actual(query)).toDeepEqual(mockOrganization);
    });
    cleanup(query);
  });

  // -----------------------------------
  query = {
    entityName: "organizations",
    field: "name",
    value: '"Enthaze"',
  };
  message(query);
  describe("search", () => {
    it("finds something", () => {
      expect(actual(query)).toDeepEqual(mockOrganization);
    });
    cleanup(query);
  });

  // -----------------------------------
  query = {
    entityName: "users",
    field: "organization_id",
    value: 118,
  };
  message(query);
  describe("search", () => {
    it("finds and does something else", () => {
      expect(actual(query)).toHaveLengthEqualTo(mockUsers);
    });
    cleanup(query);
  });

  console.log("END OF TESTS");
};

const actual = (query) => {
  let { entityName, field, value } = query;
  return search(entityName, field, value, loadDatasets());
};

const message = (query) => {
  console.log(
    `\nSearched 🔍 ENTITY: ${query.entityName} > FIELD: ${query.field} > VALUE:`,
    query.value
  );
};

const cleanup = (query) => {
  console.log(`\n---reset???`);
  console.log(query);
  query = {};
  console.log(query);
};

runTestSuite();
