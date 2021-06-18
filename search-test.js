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
  describe("search organization", () => {
    // printQuery(query);
    it(`finds results for field _id and value of type integer`, () => {
      expect(actual(query)).toDeepStrictEqual(mockOrganization);
    });
    cleanup(query);
    console.log(`${"-".repeat(80)}`);
  });

  // -----------------------------------
  query = {
    entityName: "organizations",
    field: "_id",
    value: "101",
  };
  message(query);
  describe("search organization", () => {
    it(`finds results for field _id and value of type string`, () => {
      expect(actual(query)).toDeepStrictEqual(mockOrganization);
    });
    it("toBeTypeOf", () => {
      expect(actual(query)).toBeTypeOf(mockOrganization);
      // expect(actual(query))[0]._id.toBeTypeOf(mockOrganization[0]._id);
    });
    cleanup(query);
    console.log(`${"-".repeat(80)}`);
  });

  // -----------------------------------
  query = {
    entityName: "organizations",
    field: "name",
    value: '"Enthaze"', // string must be wrapped in single quotes
  };
  message(query);
  describe("search organizations", () => {
    it(`finds results for field name and value of type string`, () => {
      expect(actual(query)).toDeepStrictEqual(mockOrganization);
    });
    cleanup(query);
    console.log(`${"-".repeat(80)}`);
  });

  // -----------------------------------
  query = {
    entityName: "users",
    field: "organization_id",
    value: 118,
  };
  message(query);
  describe("search users", () => {
    it(`finds results for field organizational_id and value of type integer`, () => {
      expect(actual(query)).toHaveLengthEqualTo(mockUsers);
    });
    cleanup(query);
    console.log(`${"-".repeat(80)}`);
  });

  console.log("END OF TESTS");
};

// -----------------------------------
// -----------------------------------
// -----------------------------------
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
  // console.log(`\n---reset???`);
  // console.log(query);
  query = {};
  // console.log(query);
};

runTestSuite();
