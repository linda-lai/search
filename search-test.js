const { search } = require("./search");
const { loadDatasets } = require("./data");
const { describe, test, expect } = require("./test/test-utils");

const { mockOrganization, mockUsers } = require("./test/data/results");

const runSearchTests = () => {
  console.log(`${"=".repeat(90)}\n${"=".repeat(90)}\n`);
  console.log(`RUNNING TESTS FOR: ${__filename}`);
  console.log(`\n${"=".repeat(90)}\n${"=".repeat(90)}`);

  let query;

  describe("search organizations entity with integer value", () => {
    query = {
      entityName: "organizations",
      field: "_id",
      value: 101,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
  });

  query = cleanup();

  describe("search organizations entity with string value", () => {
    query = {
      entityName: "organizations",
      field: "_id",
      value: "101",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
    test("returns an object", () => {
      expect(actual).toBeType(typeof mockOrganization);
    });
  });

  query = cleanup();

  describe("search organizations entity with string value", () => {
    query = {
      entityName: "organizations",
      field: "name",
      value: '"Enthaze"', // string must be wrapped in single quotes
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockOrganization);
    });
    test("finds 1 matching record", () => {
      expect(actual).toHaveLengthEqualTo(mockOrganization.length);
    });
  });

  query = cleanup();

  describe("search users entity with integer value", () => {
    query = {
      entityName: "users",
      field: "organization_id",
      value: 118,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toDeepStrictEqual(mockUsers);
    });
    test("finds 2 matching records", () => {
      expect(actual).toHaveLengthEqualTo(mockUsers.length);
    });
  });

  query = cleanup();

  describe("search users entity with integer value", () => {
    query = {
      entityName: "users",
      field: "shared",
      value: "false",
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(47);
    });
  });

  query = cleanup();

  describe("search tickets entity with integer value", () => {
    query = {
      entityName: "tickets",
      field: "organization_id",
      value: 112,
    };

    const actual = results(query);

    test(message(query), () => {
      expect(actual).toHaveLengthEqualTo(5);
    });
  });

  query = cleanup();
};

const results = ({ entityName, field, value }) =>
  search(entityName, field, value, loadDatasets());

const message = (query) =>
  `query for ENTITY: ${query.entityName} > FIELD: ${query.field} > VALUE: ${
    query.value
  } (${typeof query.value})`;

const cleanup = () => ({});

module.exports = { runSearchTests };
